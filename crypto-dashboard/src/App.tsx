// import React from "react";
import { useEffect, useRef, useState } from "react";
import "./App.less";
import { useCryptoList, type Coin } from "./Hooks/useCryptoList";
import { useCurrency } from "./Utils/CurrencyContext.tsx";
import { Layout, Switch } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoCard from "./Components/Card/Card";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled } from "@ant-design/icons";
import SelectCryptoCurrency from "./Components/SelectCurrency/SelectCurrency.tsx";

function App() {
  const { currency } = useCurrency();
  const [enableLivePrices, setEnableLivePrices] = useState<boolean>(false);
  const { data: coins = [], isLoading } = useCryptoList() as {
    data: Coin[];
    isLoading: boolean;
    isError: boolean;
    error: any;
  };
  const coinsRef = useRef(coins); // store the latest coins
  const currencyRef = useRef(currency); // store the latest currency
  const cachedItem = localStorage.getItem("cryptoData");
  const cachedCoins = cachedItem ? JSON.parse(cachedItem).data : null;
  const wsRef = useRef<WebSocket | null>(null);
  const [intervalText, setIntervalText] = useState<string>("refreshing...");
  const [livePrices, setLivePrices] = useState<Record<string, string>>({});

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    currencyRef.current = currency;
  }, [currency]);

  useEffect(() => {
    if (!coins || coins.length === 0) return;

    const products = coins.map(
      (coin) => `${coin.id.toUpperCase()}-${currency.toUpperCase()}`
    );
    const ws = new WebSocket("wss://advanced-trade-ws.coinbase.com");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "subscribe",
          channel: "ticker",
          product_ids: products,
        })
      );
      console.log("Subscribed to WS products:", products);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.channel === "ticker" && data.events) {
        data.events.forEach((evt: any) => {
          if (evt.type === "update" && evt.tickers) {
            evt.tickers.forEach((ticker: any) => {
              setLivePrices((prev) => ({
                ...prev,
                [ticker.product_id]: ticker.price,
              }));
            });
          }
        });
      }
    };

    ws.onerror = console.error;
    return () => {
      ws.close();
    };
  }, [coins, currency]);

  useEffect(() => {
    if (!enableLivePrices) {
      setIntervalText("Using Cached Data");
      return;
    }

    const refreshLivePrices = async () => {
      const coins = coinsRef.current;
      const curr = currencyRef.current;
      try {
        const ids = coins.map((coin) => coin.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${curr.toLowerCase()}`
        );
        const data = await res.json();
        setIntervalText("REFRESHING...");
        setLivePrices((prev) => {
          const updated: Record<string, string> = { ...prev };
          coins.forEach((coin) => {
            console.log("Refreshing price for coin:", coin.id, data);
            const pair = `${coin.id.toUpperCase()}-${curr.toUpperCase()}`;
            if (
              data[coin.id] &&
              data[coin.id][curr.toLowerCase()] !== undefined
            ) {
              updated[pair] = data[coin.id][curr.toLowerCase()].toString();
            }
          });
          return updated;
        });
        setIntervalText(`Last refreshed at ${new Date().toLocaleTimeString()}`);

        console.log(
          "Live prices refreshed at",
          new Date().toLocaleTimeString(),
          livePrices
        );
      } catch (err) {
        console.error("Error refreshing live prices:", err);
      }
    };
    refreshLivePrices();
    const interval = setInterval(refreshLivePrices, 120000);
    return () => clearInterval(interval);
  }, [enableLivePrices]);

  return (
    <Layout>
      <Header>
        <Switch
          checked={enableLivePrices}
          onChange={(checked) => {
            setEnableLivePrices(checked);
          }}
          checkedChildren="Live Updates On"
          unCheckedChildren="Live Updates On"
        />
        <h1>Crypto-graphy</h1>
        <p>test</p>
      </Header>
      <Content>
        <SelectCryptoCurrency />
        <div className="content-section">
          <div className="content-section-title">
            <h2>Top 20 by Market Cap</h2>
            {intervalText && (
              <span className="refresh-interval">{intervalText}</span>
            )}
          </div>
          <CryptoCard
            loading={isLoading}
            coins={coins || cachedCoins}
            currency={currency}
            livePrices={livePrices}
          />
        </div>
        <h2>Next thing</h2>
        {/* <div className="content-section">
          <Card coins={[]} currency={currency} livePrices={livePrices} />
        </div> */}
      </Content>
      <Footer>
        <div>
          <p>
            Designed and coded by{" "}
            <CryptoButton variant="dashed">
              Molly DJ
              <GithubFilled />
            </CryptoButton>
          </p>
        </div>
        <div className="resources">
          <CryptoButton
            onClick={() => window.open("https://www.coingecko.com/", "_blank")}
          >
            API
          </CryptoButton>
          <CryptoButton
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/mollydeangelisjimenez/",
                "_blank"
              )
            }
          >
            LinkedIn
          </CryptoButton>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;

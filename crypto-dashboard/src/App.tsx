// import React from "react";
import { useEffect, useRef, useState } from "react";
import "./App.less";
import { useCryptoList, type Coin } from "./Hooks/useCryptoList";
import { useCurrency } from "./Utils/CurrencyContext.tsx";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoCard from "./Components/Card/Card";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled } from "@ant-design/icons";
import SelectCryptoCurrency from "./Components/SelectCurrency/SelectCurrency.tsx";

function App() {
  const { currency } = useCurrency();
  const [enableLivePrices, setEnableLivePrices] = useState<boolean>(false);
  const {
    data: coins = [],
    isLoading,
    isError,
    error,
  } = useCryptoList() as { data: Coin[]; isLoading: boolean; isError: boolean; error: any };
  const coinsRef = useRef(coins); // store the latest coins
  const currencyRef = useRef(currency); // store the latest currency

  const wsRef = useRef<WebSocket | null>(null);
  const [intervalText, setIntervalText] = useState<string>("refreshing...");
  const [livePrices, setLivePrices] = useState<Record<string, string>>({});

  console.log("COINS IN APP:", coins);
  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    currencyRef.current = currency;
  }, [currency]);

  useEffect(() => {
    if (!coins || coins.length === 0) return;

    const products = coins.map(
      (coin) => `${coin.symbol.toUpperCase()}-${currency.toUpperCase()}`
    );

    // --- WebSocket ---
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
    const refreshLivePrices = async () => {
      const coins = coinsRef.current;
      const curr = currencyRef.current;

      if (!coins || coins.length === 0) return;

      try {
        const ids = coins.map((coin) => coin.symbol).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${curr.toLowerCase()}`
        );
        const data = await res.json();
        console.log('RESPONSE DATA>>:', res);
        setIntervalText(
              'REFRESHING...'
            );
        setLivePrices((prev) => {
          const updated: Record<string, string> = { ...prev };
          coins.forEach((coin) => {
            console.log("Refreshing price for coin:", coin.symbol, data);
            const pair = `${coin.symbol.toUpperCase()}-${curr.toUpperCase()}`;
            if (
              data[coin.symbol] &&
              data[coin.symbol][curr.toLowerCase()] !== undefined
            ) {
              updated[pair] = data[coin.symbol][curr.toLowerCase()].toString();
            }
          });
          return updated;
        });
        setIntervalText(
              `Last refreshed at ${new Date().toLocaleTimeString()}`
            )

        console.log(
          "Live prices refreshed at",
          new Date().toLocaleTimeString(),
          livePrices
        );
      } catch (err) {
        console.error("Error refreshing live prices:", err);
      }
    };

    // Run immediately on mount
    refreshLivePrices();

    // Run every 20 seconds
    const interval = setInterval(refreshLivePrices, 120000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Header>
        <h1>Crypto-graphy</h1>
      </Header>
      <Content>
        <SelectCryptoCurrency />
        <div className="content-section">
          <h2>Top 20 by Market Cap</h2>
          {intervalText && <p className="refresh-interval">{intervalText}</p>}
          <CryptoCard
            loading={isLoading}
            coins={coins}
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
            Designed and coded by <CryptoButton variant="dashed">Molly DJ<GithubFilled /></CryptoButton>
          </p>
        </div>
        <div className="resources">
          <CryptoButton onClick={"https://www.coingecko.com/"}>API</CryptoButton>
          <CryptoButton onClick={"https://www.coingecko.com/"}>LinkedIn</CryptoButton>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;

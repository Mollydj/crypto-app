// import React from "react";
import { useEffect, useReducer, useRef, useState } from "react";
import "./App.less";
import { useCryptoList, type Coin } from "./Hooks/useCryptoList";
import { useCurrency } from "./Utils/CurrencyContext.tsx";
import { Layout, Switch } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoCard from "./Components/Card/Card";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled } from "@ant-design/icons";
import SelectCryptoCurrency from "./Components/SelectCurrency/SelectCurrency.tsx";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useQueryClient } from "@tanstack/react-query";
import {useCoinbaseProducts} from "./Hooks/useCoinbaseProducts.ts";
import api from "./Utils/handleEvents.ts";

function App() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const [enableLivePrices, setEnableLivePrices] = useState<boolean>(true);
  const { data: coins = [], isLoading } = useCryptoList() as {
    data: Coin[];
    isLoading: boolean;
    isError: boolean;
    error: any;
  };

    const { data: products, isLoading: productsIsLoading, isError: productsError, error: error } = useCoinbaseProducts();
    console.log('products>>', productsIsLoading, productsError, products, error);

  const coinsRef = useRef(coins);
  const currencyRef = useRef(currency);
  const [intervalText, setIntervalText] = useState<string>("refreshing...");
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://ws-feed.exchange.coinbase.com"
  );

  const productIds = coins.map(
    (item) => item.symbol.toUpperCase() + "-" + currency.toUpperCase()
  );

  useEffect(() => {
    if (
      readyState === ReadyState.OPEN &&
      enableLivePrices &&
      productIds.length
    ) {
      sendJsonMessage({
        type: "subscribe",
        product_ids: productIds,
        channels: ["ticker_batch"],
      });
    }
  }, [readyState, enableLivePrices, coins]);

  useEffect(() => {
    if (!lastJsonMessage || !enableLivePrices) return;

    if (lastJsonMessage.type === "ticker") {
      const { product_id, price, open_24h, volume_24h } = lastJsonMessage;
      const [symbol] = product_id.split("-");

      queryClient.setQueryData<Coin[]>(
        ["cryptoList", currency],
        (oldCoins = []) =>
          oldCoins.map((coin) =>
            coin.symbol.toUpperCase() === symbol
              ? {
                  ...coin,
                  current_price: price,
                  open_24h: Number(open_24h),
                  volume_24h: Number(volume_24h),
                }
              : coin
          )
      );
    }
  }, [lastJsonMessage, enableLivePrices, queryClient, coins]);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    currencyRef.current = currency;
  }, [currency]);


  // console.log('COINS>>', coins,  new Date().toISOString())
  if (isLoading || productsIsLoading) return <p>loading...</p>;

  return (
    <Layout>
      <Header>
        <Switch
          checked={enableLivePrices}
          onChange={(checked) => {
            setEnableLivePrices(checked);
          }}
          checkedChildren="Live Updates On"
          unCheckedChildren="Live Updates Off"
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
          <CryptoCard loading={isLoading} coins={coins} currency={currency} />
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

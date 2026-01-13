// import React from "react";
import { useEffect, useReducer, useRef, useState } from "react";
import "./App.less";
import { useCryptoList, type Coin } from "./Hooks/useCryptoList";
import { useCurrency } from "./Utils/CurrencyContext.tsx";
import { CryptoProvider } from "./Utils/TickerContext.tsx";
import { Layout, Skeleton, Switch } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoCard from "./Components/Card/Card";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled } from "@ant-design/icons";
import SelectCryptoCurrency from "./Components/SelectCurrency/SelectCurrency.tsx";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useQueryClient } from "@tanstack/react-query";
import { useCoinbaseProducts } from "./Hooks/useCoinbaseProducts.ts";
import api from "./Utils/handleEvents.ts";
import type { CoinbaseProduct } from "./types.ts";

function App() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  // const { currency } = useCurrency();
  const [enableLivePrices, setEnableLivePrices] = useState<boolean>(true);
  // const { data: coins = [], isLoading } = useCoinbaseProducts();
  const { data: coins = [], isLoading } = useCoinbaseProducts();

  // console.log('coins>>', coins);

  const coinsRef = useRef(coins);
  const currencyRef = useRef(currency);
  const [intervalText, setIntervalText] = useState<string>("refreshing...");
  // const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
  //   "wss://ws-feed.exchange.coinbase.com"
  // );
  
  if (isLoading || !coins) return <p>loading...</p>;
  console.log('coins>>', coins);
  const productIds = coins.map((item: CoinbaseProduct) => item.alias);
  console.log("productIds>>", productIds);

  // useEffect(() => {
  //   if (
  //     readyState === ReadyState.OPEN &&
  //     enableLivePrices &&
  //     productIds.length
  //   ) {
  //     sendJsonMessage({
  //       type: "subscribe",
  //       product_ids: productIds,
  //       channels: ["ticker_batch"],
  //     });
  //   }
  // }, [readyState, enableLivePrices, coins]);

  // useEffect(() => {
  //   if (!lastJsonMessage) return;

  //   if (lastJsonMessage.type === "ticker") {
  //     const { product_id, price, open_24h, volume_24h } = lastJsonMessage;
  //     const [symbol] = product_id.split("-");

  //     queryClient.setQueryData<CoinbaseProduct[]>(
  //       ["cryptoList", currency],
  //       (oldCoins = []) =>
  //         oldCoins.map((coin) =>
  //           coin.base_display_symbol.toUpperCase() === symbol
  //             ? {
  //                 ...coin,
  //                 price,
  //                 open_24h,
  //                 volume_24h,
  //               }
  //             : coin
  //         )
  //     );
  //   }
  // }, [lastJsonMessage, enableLivePrices, queryClient, coins]);

  // useEffect(() => {
  //   coinsRef.current = coins;
  // }, [coins]);

  // useEffect(() => {
  //   currencyRef.current = currency;
  // }, [currency]);

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
          {/* <Skeleton active={isLoading} paragraph> */}
          <CryptoProvider coinIds={productIds} enableLivePrices={enableLivePrices} coins={coins}>
            <CryptoCard coins={coins} currency={currency} />
          </CryptoProvider>
          {/* </Skeleton> */}
        </div>
        <h2>Next thing</h2>
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

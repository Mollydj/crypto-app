// import React from "react";
import { useState } from "react";
import "./App.less";
import { useCurrency } from "./Utils/CurrencyContext";
import { CryptoProvider } from "./Utils/TickerContext";
import { Layout, Skeleton, Spin, Switch } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoCard from "./Components/Card/Card";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled } from "@ant-design/icons";
import SelectCryptoCurrency from "./Components/SelectCurrency/SelectCurrency";
import { useCoinbaseProducts } from "./Hooks/useCoinbaseProducts";
import { CoinbaseProduct } from "./types";
import { LoadingOutlined } from '@ant-design/icons';


function App() {
  const { currency } = useCurrency();
  const [enableLivePrices, setEnableLivePrices] = useState<boolean>(true);
  const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState<Date>(
    new Date()
  );
  const { data: coins = [], isLoading = true } = useCoinbaseProducts();
  const productIds = coins.map((item: any) => item.alias);
  // console.log("lastFetchedTimestamp>>", lastFetchedTimestamp);
  // console.log("coins>>", coins);
  console.log("isLoading>>", isLoading);
  return (
    <Layout>
      <Header>
        <Switch
          checked={enableLivePrices}
          onChange={(checked) => {
            setEnableLivePrices(checked);
            setLastFetchedTimestamp(new Date());
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
            {lastFetchedTimestamp && (
                <span className="refresh-interval">
                {/* <Spin indicator={<LoadingOutlined spin />} size="small" /> */}
                  {lastFetchedTimestamp && !enableLivePrices
                    ? "last update: " +
                      lastFetchedTimestamp.toLocaleTimeString()
                    : "live updates"}
                </span>
            )}
          </div>
          {
            <CryptoProvider
              coinIds={productIds}
              enableLivePrices={enableLivePrices}
              coins={coins}
            >
              <CryptoCard
                isLoading={isLoading}
                coins={coins}
                currency={currency}
              />
            </CryptoProvider>
          }
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

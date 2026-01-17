// import React from "react";
import { useEffect, useState } from "react";
import "./App.less";
import { Layout, Switch, Tooltip } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useCoinbaseProducts } from "./Hooks/useCoinbaseProducts";
import { CoinbaseProduct } from "./types";
import CryptoCard from "./Components/CryptoCard/CryptoCard";
import { queryClient } from "./Utils/queryClient";
import { fetchCoinbaseProductById } from "./Hooks/useCoinbaseProductById";
import { CryptoProvider } from "./Utils/CryptoContext";

function App() {
  const [enableLivePrices, setEnableLivePrices] = useState<boolean>(true);
  const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState<Date>(
    new Date(),
  );
  const { data: coins = [], isLoading = true } = useCoinbaseProducts() as {
    data: CoinbaseProduct[];
    isLoading: boolean;
  };

  if (!coins) return null;
  const productIds = coins.map((item: CoinbaseProduct) => item.product_id);
  console.log("coinIds>>", productIds);
  const prefetchTop20Coins = async () => {
    if (!coins?.length) return;

    await Promise.all(
      coins.map(async (coin: CoinbaseProduct) => {
        try {
          const data = await queryClient.prefetchQuery<CoinbaseProduct, Error>({
            queryKey: [coin.product_id],
            queryFn: () =>
              fetchCoinbaseProductById({ queryKey: [coin.product_id] }),
            staleTime: 1000 * 60 * 5,
          });
          console.log(`Prefetched ${coin.product_id}`, data);
        } catch (err) {
          console.error(`Failed to prefetch ${coin.product_id}`, err);
        }
      }),
    );
  };

  useEffect(() => {
    if (!coins) return;
    prefetchTop20Coins();
  }, [coins]);

  console.log("coins>>", coins);

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
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
        {/* <SelectCryptoCurrency /> */}
        <div className="content-section">
          <span className="content-section-title">
            <h2 className="section-title">
              Top Movers{" "}
              <Tooltip title="test">
                <InfoCircleOutlined />
              </Tooltip>
              {lastFetchedTimestamp && (
                <span className="refresh-interval">
                  {/* <Spin indicator={<LoadingOutlined spin />} size="small" /> */}
                  {lastFetchedTimestamp && !enableLivePrices
                    ? "last update: " +
                      lastFetchedTimestamp.toLocaleTimeString()
                    : "live updates"}
                </span>
              )}
            </h2>
          </span>
          {
            <CryptoProvider
              coinIds={productIds}
              enableLivePrices={enableLivePrices}
            >
              <CryptoCard
                // props={props}
                isLoading={isLoading}
                coins={coins}
                // currency={currency}
              />
            </CryptoProvider>
          }
        </div>
      </Content>
      {!isLoading && (
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
              onClick={() =>
                window.open("https://www.coingecko.com/", "_blank")
              }
            >
              API
            </CryptoButton>
            <CryptoButton
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/mollydeangelisjimenez/",
                  "_blank",
                )
              }
            >
              LinkedIn
            </CryptoButton>
          </div>
        </Footer>
      )}
    </Layout>
  );
}

export default App;

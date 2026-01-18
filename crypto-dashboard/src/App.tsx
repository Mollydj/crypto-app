import { useEffect, useState } from "react";
import "./App.less";
import { Layout, message, Switch } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CryptoButton from "./Components/Button/Button";
import { GithubFilled } from "@ant-design/icons";
import { useCoinbaseProducts } from "./Hooks/useCoinbaseProducts";
import { CoinbaseProduct } from "./types";
import CryptoCard from "./Components/CryptoCard/CryptoCard";
import { CryptoProvider } from "./Contexts/CryptoContext/CryptoContext";
import { EnableLivePricesContext } from "./Contexts/EnableLivePricesContext/EnableLivePricesContext";
import { MessageContext } from "./Contexts/MessagesContext/MessageContext";
import { useCurrency } from "./Contexts/CurrencyContext/CurrencyContext";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const { currency } = useCurrency();
  const { enableLivePrices, setEnableLivePrices } = EnableLivePricesContext();
  const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState<Date>(
    new Date(),
  );
  const {
    data: coins = [],
    isLoading = true,
    error,
    isSuccess,
    isError,
    isPlaceholderData
  } = useCoinbaseProducts();

  useEffect(() => {
    if (isSuccess && coins?.length && !isPlaceholderData) {
      messageApi.success(" Crypto Coins fetched 🎉");
    }
    if (isError) {
      messageApi.error(" Crypto coins failed to load  🧐");
    }
  }, [isSuccess, coins, isPlaceholderData, messageApi, isError]);

  if (isLoading) {
    return <h2>Loading coins...</h2>;
  }

  if (error) return <h2>Error! Refresh the app</h2>

  if (!Array.isArray(coins) || !currency) return null;

  const productIds = Array.isArray(coins)
    ? coins.map((item: CoinbaseProduct) => item.product_id)
    : [];

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
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
          <a
            href="https://github.com/Mollydj/crypto-app/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            README.md
          </a>
        </Header>
        <Content>
          <div className="content-section">
            {
              <CryptoProvider
                coinIds={productIds}
                enableLivePrices={enableLivePrices}
              >
                <CryptoCard
                  lastFetchedTimestamp={lastFetchedTimestamp}
                  isLoading={isLoading}
                  coins={coins}
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
                <CryptoButton
                  variant="dashed"
                  onClick={() =>
                    window.open("https://github.com/Mollydj", "_blank")
                  }
                >
                  Molly DJ
                  <GithubFilled />
                </CryptoButton>
              </p>
            </div>
            <div className="resources">
              <CryptoButton
                onClick={() =>
                  window.open(
                    "https://docs.cdp.coinbase.com/api-reference/advanced-trade-api/rest-api/introduction",
                    "_blank",
                  )
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
    </MessageContext.Provider>
  );
}

export default App;

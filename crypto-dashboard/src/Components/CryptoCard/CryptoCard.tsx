import React, { useEffect, useState } from "react";
import "./CryptoCard.less";
import { List } from "antd";
import NumberFlow from "@number-flow/react";
import { EnableLivePricesContext } from "../../Contexts/EnableLivePricesContext/EnableLivePricesContext";
import { useTickerPrice } from "../../Contexts/TickerContext/TickerContext";
import CryptoTooltip from "../CryptoTooltip/CryptoTooltip";
import { InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useSelectedCoin } from "../../Contexts/SelectedCoinContext/SelectedCoinContext";
import { CoinbaseProduct } from "../../Hooks/useCoinbaseProductById";
import { useCurrency } from "../../Contexts/CurrencyContext/CurrencyContext";

interface CardProps {
  coins: CoinbaseProduct[];
  isLoading: boolean;
  lastFetchedTimestamp: string;
}

const position = "bottom";
const align = "center";

const CryptoCard: React.FC<CardProps> = ({
  coins = [],
  isLoading,
  lastFetchedTimestamp,
}) => {
  const { setSelectedCoin } = useSelectedCoin();

  const [lastLiveUpdate, setLastLiveUpdate] = useState<string>("");
  const { currency } = useCurrency();
  const { enableLivePrices } = EnableLivePricesContext();
  const livePrices = useTickerPrice();

  const getLastLiveUpdateTimestamp = (timestamp: string) => {
    const secondsAgo = dayjs().diff(dayjs(timestamp), "seconds");
    const minutesAgo = dayjs().diff(dayjs(timestamp), "minutes");
    const hoursAgo = dayjs().diff(dayjs(timestamp), "hours");

    if (secondsAgo < 10) return "Just now";
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (minutesAgo < 60) return `${minutesAgo}m ago`;
    return `${hoursAgo}h ago`;
  };

  useEffect(() => {
    if (!lastFetchedTimestamp) return;

    setLastLiveUpdate(getLastLiveUpdateTimestamp(lastFetchedTimestamp));

    const interval = setInterval(() => {
      setLastLiveUpdate(getLastLiveUpdateTimestamp(lastFetchedTimestamp));
    }, 30000);
    return () => clearInterval(interval);
  }, [lastFetchedTimestamp]);

  useEffect(() => {
      setSelectedCoin(coins[0].product_id);
  }, [coins, setSelectedCoin]);
  if (!coins || coins.length === 0) return null;
  return (
    <>
      <div className="section-title">
        <h2>
          Top Movers{" "}
          <CryptoTooltip title="Top 20 products in the selected currency, excluding USDC. By default, products are sorted by 24-hour volume (quote currency) descending.">
            <InfoCircleOutlined />
          </CryptoTooltip>
        </h2>
        {lastFetchedTimestamp && (
          <span className="refresh-interval">
            {lastFetchedTimestamp && !enableLivePrices
              ? "last update: " + lastLiveUpdate
              : "live updates"}
          </span>
        )}
      </div>
      <List
        loading={isLoading}
        pagination={{ position, align }}
        dataSource={coins}
        renderItem={(coin: CoinbaseProduct) => {
          const livePrice = livePrices[coin.product_id]?.price || coin.price;
          const livePriceTwentyFourHourPercentage =
            livePrices[coin.product_id]?.price_percentage_change_24h ||
            coin.price_percentage_change_24h;
          return (
            <List.Item
              className="crypto-card"
              onClick={() => setSelectedCoin(coin.product_id)}
            >
              <div className="crypto-card-coin-header">
                <div className="crypto-card-name">
                  <div className="crypto-card-avatar-container">
                    <p>{coin.base_name}</p>
                  </div>
                  <CryptoTooltip title="This metric indicates the % change in price over the previous 24 hours">
                    <NumberFlow
                      willChange
                      animated
                      className={
                        Number(livePriceTwentyFourHourPercentage) / 100 > 0
                          ? "positive"
                          : "negative"
                      }
                      value={Number(livePriceTwentyFourHourPercentage) / 100}
                      format={{
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        signDisplay: "always",
                      }}
                    />
                  </CryptoTooltip>
                </div>
                <div className="crypto-card-price-container">
                  <NumberFlow
                    willChange
                    animated
                    value={livePrice}
                    format={{
                      style: "currency",
                      currency: currency,
                      trailingZeroDisplay: "stripIfInteger",
                    }}
                  />
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default CryptoCard;

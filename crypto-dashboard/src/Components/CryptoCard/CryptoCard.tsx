// CryptoCard.tsx
import React, { useEffect, useState } from "react";
import "./CryptoCard.less";
import { Avatar, Button, List } from "antd";
import {
  EllipsisOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  LoadingOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import CryptoDrawer from "../CryptoDrawer/CryptoDrawer";
import { CoinbaseProduct, placeholderCoin } from "../../types";
import { FormatMarketCap } from "../../Utils/formatMarketCap";
import NumberFlow from "@number-flow/react";
import { useTickerPrice } from "../../Utils/TickerContext";
import { useCurrency } from "../../Utils/CurrencyContext";

interface CardProps {
  coins: CoinbaseProduct[];
  currency: string;
  isLoading: boolean;
  livePrices: Record<string, number>;
}

const position = "bottom";
const align = "center";

const CryptoCard: React.FC<CardProps> = ({ coins = [], isLoading }) => {
  const [selectedCoin, setSelectedCoin] = useState<string>(
    placeholderCoin.product_id,
  );
  const { currency } = useCurrency();
  const livePrices = useTickerPrice();
  useEffect(() => {
    setSelectedCoin(coins[0].product_id);
  }, [coins]);
  if (!coins || coins.length === 0) return null;

  return (
    <div className="card-container">
      <div className="card-content-wrapper">
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
                      <Avatar size={20}>
                        <TransactionOutlined size={18} />
                      </Avatar>
                      <p>{coin.base_name}</p>
                    </div>
                    <span
                      className={
                        Number(coin.price_percentage_change_24h) < 0
                          ? "negative"
                          : "positive"
                      }
                    >
                      <NumberFlow
                        willChange
                        animated
                        value={livePriceTwentyFourHourPercentage / 100}
                        format={{
                          style: "percent", // format as %
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                          signDisplay: "always",
                        }}
                      />
                      {/* {livePriceTwentyFourHourPercentage > 0 ? "+" : ""}
                      {livePriceTwentyFourHourPercentage
                        ? `${Number(livePriceTwentyFourHourPercentage).toFixed(2)}%`
                        : "No Market Data"} */}
                      <br />
                      {/* <InfoCircleOutlined color="#000000" /> */}
                    </span>
                    {/* <Button
                  className="card-expand-button"
                  onClick={() => setSelectedCoin(coin.product_id)}
                >
                  <EllipsisOutlined />
                </Button> */}
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
      </div>

      {/* Drawer for selected coin */}
      <CryptoDrawer
        isLoading={isLoading}
        width="85%"
        productId={selectedCoin}
      />
    </div>
  );
};

export default CryptoCard;

{
  /* <div className="market-cap">
                    {formatMarketCap(
                      livePrice * parseFloat(coin.base_max_size),
                    )}
                  </div> */
}

import React from "react";
import "./Card.less";
import { formatLargeNumber } from "../../Utils/formatLargeNumbers";
import { useCurrency } from "../../Utils/CurrencyContext";
import { Avatar, Card, Flex, Skeleton } from "antd";
import CryptoButton from "../Button/Button";

interface Coin {}

interface CardProps {
  coins: Coin[];
  currency: string;
  loading: boolean;
  livePrices: Record<string, string>;
}

const CryptoCard: React.FC<CardProps> = ({
  coins = [],
  livePrices,
  loading,
}) => {
  const { currency } = useCurrency();

  return (
    <div className="card-container">
      {coins.map((coin: any) => {
        const pair = `${coin.symbol.toUpperCase()}-${currency}`;
        const priceNumber = Number(livePrices[pair] ?? coin.current_price);
        const displayPrice = priceNumber.toLocaleString("en-US", {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
        return (
          <Skeleton
            active={!coins || loading}
            loading={!coins || loading}
            key={coin.id}
          >
            <Flex vertical>
              <Card key={coin.id} className="crypto-card">
                <Avatar shape="square" src={coin.image}>
                  {coin.symbol?.toUpperCase()?.[0]}
                </Avatar>
                <span>
                  {coin.market_cap_rank}. {coin.name} (
                  {coin.symbol.toUpperCase()})
                </span>
                <CryptoButton className="card-button">
                  {displayPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })}
                </CryptoButton>
                <span
                  className={
                    coin.market_cap_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }
                >
                  {coin.market_cap_change_percentage_24h > 0 ? "+" : ""}
                  {coin.market_cap_change_percentage_24h.toFixed(2)}%
                  <br />
                </span>
              </Card>
            </Flex>
          </Skeleton>
        );
      })}
    </div>
  );
};

export default CryptoCard;

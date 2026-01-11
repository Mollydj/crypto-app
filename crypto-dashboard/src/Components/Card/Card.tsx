import React from "react";
import "./Card.less";
import { formatLargeNumber } from "../../Utils/formatLargeNumbers";
import { useCurrency } from "../../Utils/CurrencyContext";
import Button from "../Button/Button";

interface Coin {}

interface CardProps {
  coins: Coin[];
  currency: string;
}

const Card: React.FC<CardProps> = ({ coins }) => {
  const { currency } = useCurrency();

  console.log("coins>>", currency, coins);

  if (!coins || !currency)
    return (
      <div className="card-container">
        {Array.from({ length: 20 }).map((_, idx) => (
          <div key={idx} className="crypto-card is-loading" />
        ))}
      </div>
    );
  return (
    <div className="card-container">
      {coins.map((coin: any) => (
        <div key={coin.id} className="crypto-card">
          <img src={coin.image} alt={coin.name} />
          <span>
            {coin.market_cap_rank}. {coin.name} ({coin.symbol.toUpperCase()})
          </span>
          <Button>
            {coin.current_price.toLocaleString("en-US", {
              style: "currency",
              currency: currency,
            })}
          </Button>
          {/* <span className="tooltip">{formatLargeNumber(coin.market_cap_change_24h)}</span> */}
          <span
            className={
              coin.market_cap_change_percentage_24h < 0
                ? "negative"
                : "positive"
            }
          >
            {coin.market_cap_change_percentage_24h > 0 ? "+" : ""}
            {coin.market_cap_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default Card;

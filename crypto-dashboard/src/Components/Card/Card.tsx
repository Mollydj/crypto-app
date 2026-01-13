import React, { useEffect, useRef, useState } from "react";
import "./Card.less";
import { useCurrency } from "../../Utils/CurrencyContext";
import { Avatar, Card, Flex, Skeleton } from "antd";
import CryptoButton from "../Button/Button";
import type { Coin } from "../../Hooks/useCryptoList";


interface CardProps {
  coins: Coin[];
  currency: string;
  loading: boolean;
}

const CryptoCard: React.FC<CardProps> = ({ coins = [], loading }) => {
  const { currency } = useCurrency();
  return (
    <div className="card-container">
      {coins.map((coin: any) => {
        const pair = `${coin.symbol.toUpperCase()}-${currency}`;
        // console.log("COIN>>", pair, coin.current_price, new Date().toISOString());
        return (
          // <Skeleton
          //   active={!coins || loading}
          //   loading={!coins || loading}
          //   key={coin.id}
          // >
            <Flex vertical key={coin.id}>
              <Card  className="crypto-card">
                <Avatar shape="square" src={coin.image}>
                  {coin.symbol?.toUpperCase()?.[0]}
                </Avatar>
                <span>
                  {coin.market_cap_rank}. {coin.name} (
                  {coin.symbol.toUpperCase()})
                </span>
                <CryptoButton className="card-button">
                  {coin.current_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })}
                </CryptoButton>
                  {coin.current_price}
                <span
                  className={
                    coin.market_cap_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }
                >
                  {coin.market_cap_change_percentage_24h > 0 ? "+" : ""}
                  {coin.market_cap_change_percentage_24h
                    ? `${coin.market_cap_change_percentage_24h.toFixed(2)}%`
                    : "No Market Data"}
                  <br />
                </span>
              </Card>
            </Flex>
          // </Skeleton>
        );
      })}
    </div>
  );
};

export default CryptoCard;

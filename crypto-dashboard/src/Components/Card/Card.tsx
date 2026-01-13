import React, { useEffect, useRef, useState } from "react";
import "./Card.less";
import { useCurrency } from "../../Utils/CurrencyContext";
import { Avatar, Card, Flex, Image, Skeleton } from "antd";
import CryptoButton from "../Button/Button";
import type { Coin } from "../../Hooks/useCryptoList";
import type { CoinbaseProduct } from "../../types";
import { useCoinImage } from "../../Hooks/useCoinGeckoImage";
// import type { top20Coin } from "../../Hooks/useCoinbaseProducts";
import { useTickerPrice } from "../../Utils/TickerContext";

interface CardProps {
  coins: CoinbaseProduct;
  currency: string;
  // loading: boolean;
}
// TO DO: CREATE ANOTHER ENDPOINT TO GET DATA BY COIN INSTEAD OF all coins on APP.TSX

const CryptoCard: React.FC<CardProps> = ({ coins = [] }) => {
  if (!coins) return;

  return (
    <div className="card-container">
      {coins.map((coin: any, index) => {
        if (!coin) return;
        const price = useTickerPrice(coin.alias);
        return (
          <Skeleton active={!coins} loading={!coins} key={coin.product_id}>
            <Flex vertical>
              <Card className="crypto-card">
                {(index + 1).toString()}
                <Avatar shape="square" src={coin.product_id}>
                  {/* <Skeleton avatar active={isLoading}>
                    <Image
                      src={imageUrl}
                      alt={coin.base_display_symbol}
                    />
                  </Skeleton> */}
                  {coin.base_display_symbol}
                </Avatar>

                <CryptoButton className="card-button">
                  {price || coin.price}
                </CryptoButton>
                <span
                  className={
                    Number(coin.price_percentage_change_24h) < 0
                      ? "negative"
                      : "positive"
                  }
                >
                  {Number(coin.price_percentage_change_24h) > 0 ? "+" : ""}
                  {Number(coin.price_percentage_change_24h)
                    ? `${Number(coin.price_percentage_change_24h).toFixed(2)}%`
                    : "No Market Data"}
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

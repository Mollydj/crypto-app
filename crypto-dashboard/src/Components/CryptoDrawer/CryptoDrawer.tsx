import React from "react";
import "./CryptoDrawer.less";
import { Avatar, Col, Drawer, Row } from "antd";
import { useCoinbaseProductById } from "../../Hooks/useCoinbaseProductById";
import { useTickerPrice } from "../../Utils/TickerContext";
import { FormatMarketCap } from "../../Utils/formatMarketCap";
import NumberFlow from "@number-flow/react";
import { placeholderCoin } from "../../types";
import { getPriceDelta } from "../../Utils/getPriceDelta";

interface CardProps {
  productId: string;
  width: string;
  // isLoading: boolean;
}

const CryptoDrawer: React.FC<CardProps> = ({ productId, width }) => {
  const { data: coin, isLoading = true } = useCoinbaseProductById(productId);
  // const livePrice = useTickerPrice(productId);
  const livePrices = useTickerPrice();
  const livePriceData = livePrices[coin.product_id];
  const livePrice = livePriceData?.price ?? coin.price;
  const change24h =
    livePriceData?.price_percentage_change_24h ??
    coin.price_percentage_change_24h;
  console.log("coin>>", livePrice, change24h);
  if (!productId || !coin) return;
  return (
    <Drawer
      keyboard
      loading={isLoading}
      defaultSize={width}
      placement="right"
      closable={false}
      open
      getContainer={false}
      mask={false}
    >
      {!coin && null}
      <span className="crypto-drawer-title">
        <h1>{coin.display_name}</h1>
        <div className="crypto-drawer-change">
          <h2 className="section-title">
            <NumberFlow
              willChange
              animated
              value={livePriceData?.price}
              format={{
                style: "currency",
                currency: "USD",
                trailingZeroDisplay: "stripIfInteger",
              }}
            />
          </h2>
        </div>
      </span>
      <br />
      {/* <div className="coin-details-container">
      Market Cap: {FormatMarketCap(coin.price * coin.base_max_size)}
        <p>Type: {coin.product_type}</p>

        <p>
          Current Price:{" "}
          <NumberFlow
            willChange
            animated
            value={livePrice}
            format={{
              style: "currency",
              currency: "USD",
              trailingZeroDisplay: "stripIfInteger",
            }}
          />
        </p>
        <p>
          24h Volume:{" "}
          {FormatMarketCap(parseFloat(coin.approximate_quote_24h_volume))}
        </p>
        <p>Status: {coin.status}</p>
        <p>About: {coin.about_description || "No description available."}</p>
      </div> */}
    </Drawer>
  );
};

export default CryptoDrawer;

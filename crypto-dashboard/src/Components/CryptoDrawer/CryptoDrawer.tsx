import React from "react";
import "./CryptoDrawer.less";
import { Avatar, Button, Col, Drawer, List, Row, Segmented } from "antd";
import { useCoinbaseProductById } from "../../Hooks/useCoinbaseProductById";
import { useTickerPrice } from "../../Utils/TickerContext";
import { FormatMarketCap } from "../../Utils/formatMarketCap";
import NumberFlow from "@number-flow/react";
import { placeholderCoin } from "../../types";
import { getPriceDelta } from "../../Utils/getPriceDelta";
import CryptoChart from "../CryptoChart/CryptoChart";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SyncOutlined,
  LineChartOutlined,
  DeploymentUnitOutlined,
  TagOutlined,
  ClockCircleOutlined,
  SwapOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { getCoinDrawerData } from "./DrawerStatistics";
import { useCurrency } from "../../Utils/CurrencyContext";

interface CardProps {
  productId: string;
  width: string;
  // isLoading: boolean;
}

const CryptoDrawer: React.FC<CardProps> = ({ productId, width }) => {
  const { data: coin, isLoading, error } = useCoinbaseProductById(productId);
  const { currency, setCurrency } = useCurrency();
  const livePrices = useTickerPrice();
  const buySellOnCoinbase = `https://www.coinbase.com/price/${coin.base_display_symbol.toLowerCase()}?locale=${currency.toLowerCase()}`;

  if (!coin) return null;
  const livePriceData = livePrices[coin.product_id];
  const side = livePriceData?.side || placeholderCoin.side;

  return (
    <div className="drawer-test">
      {!coin && null}
      <span className="crypto-drawer-title">
        <h1>{coin.display_name}</h1>
        <div className="crypto-drawer-change">
          <Button
            className="crypto-buy-sell-button"
            onClick={() => window.open(buySellOnCoinbase, "_blank")}
          >
            {side} on Coinbase
          </Button>
        </div>
      </span>
      <br />
      <div>
        <CryptoChart coin={coin} productId={productId} />
        <Segmented<string>
          options={["EUR", "GBP", "USD"]}
          value={currency}
          onChange={(value) => {
            setCurrency(value);
          }}
        />
      </div>
      <h3>{coin.base_name} Statistics</h3>

      <List
        className="crypto-drawer-list"
        dataSource={getCoinDrawerData(coin, currency, livePriceData)}
        renderItem={(item) => (
          <List.Item key={item.key} className="crypto-drawer-list-item">
            <div className="crypto-drawer-stats">
              {<Avatar> {item.icon}</Avatar>}
              {item.label}
            </div>
            <div>{item.value}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CryptoDrawer;

import React from "react";
import "./CryptoDrawer.less";
import { Avatar, Button, List } from "antd";
import { useCoinbaseProductById } from "../../Hooks/useCoinbaseProductById";
import { placeholderCoin } from "../../types";
import CryptoChart from "../CryptoChart/CryptoChart";
import { getCoinDrawerData } from "./DrawerStatistics";
import SelectCurrency from "../SelectCurrency/SelectCurrency";
import { useTickerPrice } from "../../Contexts/TickerContext/TickerContext";
import CryptoLoader from "../CryptoLoader/CryptoLoader";
import CryptoError from "../CryptoError.tsx/CryptoError";
import { LoadingOutlined } from "@ant-design/icons";
import { useCurrency } from "../../Contexts/CurrencyContext/CurrencyContext";

interface CardProps {
  productId: string;
  width: string;
}

const CryptoDrawer: React.FC<CardProps> = ({ productId }) => {
  const { data: coin, isLoading, error } = useCoinbaseProductById(productId);
  const { currency } = useCurrency();
  const livePrices = useTickerPrice();
  const buySellOnCoinbase = `https://www.coinbase.com/price/${coin.base_display_symbol.toLowerCase()}?locale=${currency.toLowerCase()}`;

  if (!coin || isLoading) return <CryptoLoader />;
  if (error) return <CryptoError />;
  const livePriceData = livePrices[coin.product_id];
  const side = livePriceData?.side || placeholderCoin.side;

  return (
    <div className="crpyto-drawer">
      {!coin && null}
      <span className="crypto-drawer-title">
        <h1>{coin.display_name}</h1>
        <div className="crypto-drawer-change">
          <SelectCurrency />
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
      </div>

      <List
        header={<h3>{coin.base_name} Statistics</h3>}
        loading={{
          spinning: isLoading || !coin,
          indicator: <LoadingOutlined />,
        }}
        rootClassName="crypto-drawer-list"
        dataSource={getCoinDrawerData(coin, currency, livePriceData)}
        renderItem={(item) => (
          <>
            <List.Item key={item.key} className="crypto-drawer-list-item">
              <div className="crypto-drawer-stats">
                {<Avatar> {item.icon}</Avatar>}
                {item.label}
              </div>
              <div>{item.value}</div>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default CryptoDrawer;

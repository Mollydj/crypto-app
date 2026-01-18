import React, { ReactElement } from "react";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineChartOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { CoinWithCoinbaseNormalized } from "../../Hooks/useCoinbaseProductById";
import { CoinbaseProduct } from "../../types";
import { CurrencyContextType } from "../../Contexts/CurrencyContext/CurrencyContext";
import NumberFlow from "@number-flow/react";

export type FormatType = "currency" | "percent" | "raw";

export interface DrawerStat {
  label: string;
  value: number | string | ReactElement;
  icon: React.ReactNode;
  format?: FormatType;
}

export const getCoinDrawerData = (
  coin: CoinbaseProduct,
  currency: CurrencyContextType,
  livePriceData?: CoinWithCoinbaseNormalized,
): DrawerStat[] => {
  if (!coin || !livePriceData || !currency) return;
  const price = livePriceData?.price ?? coin.price;
  const priceChange =
    livePriceData?.price_percentage_change_24h ??
    coin.price_percentage_change_24h;
  const volume24h = livePriceData?.volume_24h ?? coin.volume_24h;
  const quoteVolume24h =
    livePriceData?.approximate_quote_24h_volume ??
    coin.approximate_quote_24h_volume;
  return [
    {
      label: `Price (${currency})`,
      value: (
        <NumberFlow
          willChange
          animated
          value={price}
          format={{
            style: "currency",
            currency: currency,
            trailingZeroDisplay: "stripIfInteger",
          }}
        />
      ),
      icon: <DollarOutlined />,
      format: "currency",
    },
    {
      label: "24h Price Change (%)",
      value: (
        // TODO: ADD COLOR HERE FOR NEGATIVE NUMBERS
        <NumberFlow
          willChange
          animated
          className={priceChange / 100 > 0 ? "positive" : "negative"}
          value={priceChange / 100}
          format={{
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: "always",
          }}
        />
      ),
      icon:
        Number(priceChange) > 0 ? (
          <ArrowUpOutlined className="positive" />
        ) : (
          <ArrowDownOutlined className="negative" />
        ),
      format: "percent",
    },
    {
      label: "24h Volume (Base / Quote)",
      value: `${volume24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${coin.base_display_symbol} / $${quoteVolume24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${coin.quote_display_symbol}`,
      icon: <LineChartOutlined />,
      format: "raw",
    },

    {
      label: "Base / Quote Increment",
      value: `${coin.base_increment} / ${coin.quote_increment}`,
      icon: <SyncOutlined />,
      format: "raw",
    },
    {
      label: "Trading Status",
      value: coin.status,
      icon: <ClockCircleOutlined />,
      format: "raw",
    },
    {
      label: "Price Direction",
      value: Number(priceChange) > 0 ? "Up" : "Down",
      icon:
        Number(priceChange) > 0 ? (
          <ArrowUpOutlined className="positive" />
        ) : (
          <ArrowDownOutlined className="negative" />
        ),
      format: "raw",
    },
  ];
};

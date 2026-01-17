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
import { CurrencyType } from "../../Utils/CurrencyContext";
import NumberFlow from "@number-flow/react";

export type FormatType = "currency" | "percent" | "raw";

export interface DrawerStat {
  label: string;
  value: number | string | ReactElement;
  icon: React.ReactNode;
  format?: FormatType;
}

// Utility function to format value based on the format flag
export const formatDrawerValue = (
  item: DrawerStat,
): string | React.ReactNode => {
  if (item.format === "currency") {
    if (typeof item.value === "number") {
      return `$${item.value.toLocaleString()}`;
    }
    return item.value;
  }

  if (item.format === "percent") {
    if (typeof item.value === "number" || !isNaN(Number(item.value))) {
      return `${Number(item.value).toFixed(2)}%`;
    }
    return item.value;
  }

  return item.value;
};

export const getCoinDrawerData = (
  coin: CoinbaseProduct,
  currency: CurrencyType,
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

    console.log('currency>>', currency);

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
        <NumberFlow
          willChange
          animated
          value={priceChange/100}
          format={{
            style: "percent", // format as %
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

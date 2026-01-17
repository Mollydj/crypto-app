import { useCurrency } from "./CurrencyContext";

export function FormatMarketCap(value: number): string {
  const { currency } = useCurrency();
  if (!value) return "-";

  const num = typeof value === "string" ? parseFloat(value) : Number(value);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  });

  return formatter.format(num);
}
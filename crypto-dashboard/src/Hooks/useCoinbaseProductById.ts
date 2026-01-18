import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { CoinbaseProduct, placeholderCoin } from "../types";

export type CoinWithCoinbaseNormalized = Omit<
  CoinbaseProduct,
  "price" | "price_percentage_change_24h" | "volume_24h" | "approximate_quote_24h_volume" | "price_difference" | "price_difference_percent" | "price_increment"
> & {
  price: number;
  price_percentage_change_24h: number;
  volume_24h: number;
  approximate_quote_24h_volume: number;
  price_difference: number;
  price_difference_percent: number;
  price_increment: number;
};

export const fetchCoinbaseProductById = async (productId: string): Promise<CoinbaseProduct> => {
  const response = await api.get(`/api/marketcapid?coin=${productId}`);
  return response.data;
};

export const useCoinbaseProductById = (productId: string) =>
  useQuery<CoinbaseProduct, Error, CoinWithCoinbaseNormalized>({
    queryKey: ["coinbaseProduct", productId] as const,
    queryFn: () => fetchCoinbaseProductById(productId),
    enabled: Boolean(productId),
    placeholderData: placeholderCoin,
    select: (coin) => ({
      ...coin,
      price: Number(coin.price),
      price_percentage_change_24h: Number(coin.price_percentage_change_24h),
      volume_24h: Number(coin.volume_24h),
      approximate_quote_24h_volume: Number(coin.approximate_quote_24h_volume),
      price_difference: Number(coin.price_difference),
      price_difference_percent: Number(coin.price_difference_percent),
      price_increment: Number(coin.price_increment),
    }),
  });

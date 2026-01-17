import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { CoinbaseProduct, placeholderCoin } from "../types";

export interface CoinbaseProductNormalized extends Omit<
  CoinbaseProduct,
  | "price"
  | "price_percentage_change_24h"
  | "volume_24h"
  | "approximate_quote_24h_volume"
> {
  price?: number;
  price_percentage_change_24h?: number;
  volume_24h?: number;
  approximate_quote_24h_volume?: number;
}

export type CoinWithCoinbaseNormalized = CoinbaseProduct & CoinbaseProductNormalized;

export const fetchCoinbaseProductById = async (
  productId: string,
): Promise<CoinbaseProduct> => {
  // const [coin] = queryKey;
  const response = await api.get(`/api/marketcapid?coin=${productId}`);
  return response.data;
};

export const useCoinbaseProductById = (productId?: string) =>
  useQuery<CoinbaseProduct, Error, CoinWithCoinbaseNormalized>({
    queryKey: ["coinbaseProduct", productId],
    queryFn: () => fetchCoinbaseProductById(productId),
    enabled: Boolean(productId), // <-- ensures no fetch happens when undefined
    placeholderData: placeholderCoin,
    select: (coin) => ({
      ...coin,
      price: Number(coin.price),
      price_percentage_change_24h: Number(coin.price_percentage_change_24h),
      volume_24h: Number(coin.volume_24h),
      approximate_quote_24h_volume: Number(coin.approximate_quote_24h_volume),
    }),
  });

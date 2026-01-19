import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { CoinbaseProduct, placeholderCoin } from "../types";

export type CoinbaseProduct = Omit<
  CoinbaseProduct,
  "price" | "price_percentage_change_24h" | "volume_24h" | "approximate_quote_24h_volume" | "price_difference" | "price_difference_percent" | "price_increment"
> & {
  price: string;
  price_percentage_change_24h: string;
  volume_24h: string;
  approximate_quote_24h_volume: string;
  price_difference: string;
  price_difference_percent: string;
  price_increment: string;
};

export const fetchCoinbaseProductById = async (productId: string): Promise<CoinbaseProduct> => {
  const response = await api.get(`/api/marketcapid?coin=${productId}`);
  console.log(`${productId} data fetched successfully from Coinsbase API`);
  return response.data;
};

export const useCoinbaseProductById = (productId: string) =>
  useQuery<CoinbaseProduct, Error, CoinbaseProduct>({
    queryKey: ["coinbaseProduct", productId] as const,
    queryFn: () => fetchCoinbaseProductById(productId),
    enabled: Boolean(productId),
    placeholderData: placeholderCoin,
    select: (coin) => ({
      ...coin,
      price: coin.price,
      price_percentage_change_24h: coin.price_percentage_change_24h,
      volume_24h: coin.volume_24h,
      approximate_quote_24h_volume: coin.approximate_quote_24h_volume,
      price_difference: coin.price_difference,
      price_difference_percent: coin.price_difference_percent,
      price_increment: coin.price_increment,
    }),
  });

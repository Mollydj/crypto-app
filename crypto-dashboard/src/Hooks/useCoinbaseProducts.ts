// src/Hooks/useCoinbaseProducts.ts
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents"; // Axios instance pointing to localhost
import { useCurrency } from "../Utils/CurrencyContext";
import { CoinbaseProduct, placeHolderTop20Coins } from "../types";

export type sorter = {
  price: string;
  base_max_size: string;
};

type CoinbaseProductsQueryKey = [
  "coinbaseProducts",
  string, // currency
];

export const fetchCoinbaseProducts = async (
  ctx: QueryFunctionContext<CoinbaseProductsQueryKey>
): Promise<CoinbaseProduct[]> => {
  const [, currency] = ctx.queryKey;
  const res = await api.get("/api/marketcap");
  const allProducts: CoinbaseProduct[] = res.data.products
    .filter((item: CoinbaseProduct) => item.quote_display_symbol === currency)
    .filter((item: CoinbaseProduct) => !item.display_name.includes('USDC'))
    .slice(0, 20);
  return allProducts;
};

export const useCoinbaseProducts = () => {
  const { currency } = useCurrency();
  return useQuery<CoinbaseProduct[], Error>({
    queryKey: ["coinbaseProducts", currency],
    queryFn: fetchCoinbaseProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: placeHolderTop20Coins
  });
};

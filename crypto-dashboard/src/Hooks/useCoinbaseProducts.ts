import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { CoinbaseProduct, placeHolderTop20Coins } from "../types";
import { CurrencyType } from "../Contexts/CurrencyContext/CurrencyProvider";
import { useCurrency } from "../Contexts/CurrencyContext/CurrencyContext";

export type sorter = {
  price: string;
  base_max_size: string;
};

export const fetchCoinbaseProducts = async (
  currency: CurrencyType,
): Promise<CoinbaseProduct[]> => {
  const res = await api.get("/api/marketcap");
  console.log("Coinsbase API data fetched successfully");
  return res.data.products
    .filter((p: CoinbaseProduct) => p.quote_display_symbol === currency)
    .filter((p: CoinbaseProduct) => !p.display_name.includes("USDC"))
    .slice(0, 20);
};

export const useCoinbaseProducts = () => {
  const { currency } = useCurrency();
  return useQuery<CoinbaseProduct[], Error>({
    queryKey: ["coinbaseProducts", currency] as const,
    queryFn: () => fetchCoinbaseProducts(currency),
    staleTime: 1000 * 60 * 5,
    placeholderData: placeHolderTop20Coins,
  });
};

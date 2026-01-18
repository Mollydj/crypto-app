import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { CoinbaseProduct, placeHolderTop20Coins } from "../types";
import { CurrencyType, useCurrency } from "../Contexts/CurrencyContext";

export type sorter = {
  price: string;
  base_max_size: string;
};

export const fetchCoinbaseProducts = async (
  currency: CurrencyType,
): Promise<CoinbaseProduct[]> => {
  console.log("currency>>", currency);
  const res = await api.get("/api/marketcap");
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

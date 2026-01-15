// src/Hooks/useCoinbaseProducts.ts
import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents"; // Axios instance pointing to localhost
import { useCurrency } from "../Utils/CurrencyContext";

export type CoinbaseProduct = {
  id: string;
  name: string;
  base_currency: string;
  quote_currency: string;
  status: string;
  product_type: string;
};

const fetchCoinbaseProducts = async (): Promise<CoinbaseProduct[]> => {
  const res = await api.get(`/api/crypto`);
  const allProducts: CoinbaseProduct[] = res.data.products.filter((item: any) => item.alias_to.length === 0).slice(0, 20);
  return allProducts;
};

export const useCoinbaseProducts = () => {
  const { currency } = useCurrency();
  return useQuery<CoinbaseProduct[], Error>({
    queryKey: ["coinbaseProducts", currency],
    queryFn: fetchCoinbaseProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

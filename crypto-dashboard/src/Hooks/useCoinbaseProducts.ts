// src/Hooks/useCoinbaseProducts.ts
import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents"; // Axios instance pointing to localhost

export type CoinbaseProduct = {
  id: string;
  name: string;
  base_currency: string;
  quote_currency: string;
  status: string;
  product_type: string;
  // add any other fields you care about from the response
};

const fetchCoinbaseProducts = async (): Promise<CoinbaseProduct[]> => {
  const res = await api.get("/api/products");

  // If res.data.products exists, use it; otherwise assume res.data is the array
  const allProducts: CoinbaseProduct[] =
    Array.isArray(res.data.products) ? res.data.products : res.data;

  // Filter online only
  const onlineProducts = allProducts.filter(
    (product) => product.status?.toUpperCase() === "ONLINE"
  );

  console.log("Filtered online products:", onlineProducts);

  return onlineProducts;
};

export const useCoinbaseProducts = () => {
  return useQuery<CoinbaseProduct[], Error>({
    queryKey: ["coinbaseProducts"],
    queryFn: fetchCoinbaseProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

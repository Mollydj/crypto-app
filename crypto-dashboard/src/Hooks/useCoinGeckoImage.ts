import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";

const fetchCoingeckoImage = async (): Promise<any[]> => {
  const res = await api.get("/api/cryptoImage");
  const allProducts: any[] = res.data.products.filter((item: any) => item.alias_to.length === 0).slice(0, 20);
  return allProducts;
};


export const useCoinGeckoImage = () => {
  return useQuery<any[], Error>({
    queryKey: ["coinbaseProducts"],
    queryFn: fetchCoingeckoImage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

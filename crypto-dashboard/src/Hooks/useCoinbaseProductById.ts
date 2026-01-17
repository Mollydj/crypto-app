import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { CoinbaseProduct, placeholderCoin } from "../types";

export const fetchCoinbaseProductById = async ({
  queryKey,
}: {
  queryKey: [string];
}): Promise<CoinbaseProduct> => {
  const [coin] = queryKey; // "BTC-USD"
  console.log("queryKey >>", queryKey);

  const response = await api.get(`/api/marketcapid?coin=${coin}`);
  return response.data;
};

export const useCoinbaseProductById = (coin: string) => {
  return useQuery<CoinbaseProduct, Error>({
    queryKey: [coin],
    queryFn: fetchCoinbaseProductById,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: placeholderCoin,
    enabled: !!coin,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { useCurrency } from "../Utils/CurrencyContext";
import { message } from "antd";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  image: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  last_updated: string;
};

export const useCryptoList = () => {
  const { currency } = useCurrency();
  const API_URL = `http://localhost:3001/api/crypto?currency=${currency.toLowerCase()}`;

  return useQuery<Coin[], Error>({
    queryKey: ["cryptoList", currency],
    queryFn: async () => {
      try {
        const { data } = await api.get(API_URL);
        return data; // ✅ return the array of coins only
      } catch (err: any) {
        throw err; // propagate to React Query so isError works
      }
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      message.success(`Crypto data fetched successfully in ${currency} 🎉`);
    },
    onError: (err: any) => {
      if (err.response?.status === 429) {
        message.warning("You’ve reached the API limit. Please wait a bit ⏳");
      } else if (err.response?.status === 500) {
        message.warning("Internal Server Error ⏳");
      } else {
        message.error("Failed to fetch crypto data ❌");
      }
    },
  });
};

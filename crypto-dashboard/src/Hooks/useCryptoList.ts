import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
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
  market_cap_change_percentage_24h: number;
};

export const useCryptoList = () => {
  const { currency } = useCurrency();
  // const API_URL = `${import.meta.env.BASE_URL}/api/crypto`;
  const API_URL = 'https://crypto-app-pg8n.onrender.com/api/crypto';
  console.log('API_URL>>', API_URL);

  const fetchCrypto = async (): Promise<Coin[]> => {
    try {
      const { data } = await api.get<Coin[]>(API_URL);
      // localStorage.setItem(
      //   "cryptoData",
      //   JSON.stringify({ data, timestamp: Date.now() })
      // );

      // console.log("Crypto data cached successfully");
      // message.success("Crypto data cached successfully 🎉");
      return data;
    } catch (err: any) {
      console.error("API fetch failed:", err);
      const cached = localStorage.getItem("cryptoData");
      if (cached) {
        const parsed = JSON.parse(cached);
        // console.log("Using cached crypto data due to API error");
        // message.warning("Using cached crypto data due to API error ⚠️");
        return parsed.data;
      }
      message.error("Failed to fetch crypto data and no cache available ❌");
      throw new Error("Failed to fetch crypto data and no cache available");
    }
  };

  const queryOptions = {
    queryKey: ["cryptoList", currency],
    queryFn: fetchCrypto,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    onError: (err: any) => {
      if (err.response?.status === 429) {
        message.warning("API limit reached. Please wait ⏳");
      } else if (err.response?.status === 500) {
        message.warning("Internal Server Error ⏳");
      } else {
        console.error(err);
      }
    },
    onSuccess: () => {
      message.success(`Crypto data fetched successfully in ${currency} 🎉`);
    },
  } as UseQueryOptions<Coin[], Error>; // ← cast here

  return useQuery<Coin[], Error>(queryOptions);
};

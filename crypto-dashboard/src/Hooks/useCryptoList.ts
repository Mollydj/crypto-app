import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";
import { useCurrency } from "../Utils/CurrencyContext";
import { message } from "antd";
import { useState } from "react";

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
  const [cryptoData, setCryptoData] = useState<Coin[] | null>(null);

  const API_URL = `http://localhost:3001/api/crypto?currency=${currency.toLowerCase()}`;

  const fetchCrypto = async (): Promise<Coin[]> => {
    try {
      const { data } = await api.get<Coin[]>(API_URL);
      setCryptoData(data);

      // Cache successful API response
      localStorage.setItem(
        "cryptoData",
        JSON.stringify({ data, timestamp: Date.now() })
      );

      console.log("Crypto data cached successfully");
      message.success("Crypto data cached successfully 🎉");
      return data;
    } catch (err: any) {
      console.error("API fetch failed:", err);

      // Try to use cached data if available
      const cached = localStorage.getItem("cryptoData");
      if (cached) {
        const parsed = JSON.parse(cached);
        setCryptoData(parsed.data);
        console.log("Using cached crypto data due to API error");
        message.warning("Using cached crypto data due to API error ⚠️");
        return parsed.data; // Return cached data instead of throwing
      }

      // No cache available → propagate error
      message.error("Failed to fetch crypto data and no cache available ❌");
      throw new Error("Failed to fetch crypto data and no cache available");
    }
  };

  return useQuery<Coin[], Error>({
    queryKey: ["cryptoList", currency],
    queryFn: fetchCrypto,
    staleTime: 1000 * 60, // 1 min
    refetchOnWindowFocus: false,
    onSuccess: () => {
      message.success(`Crypto data fetched successfully in ${currency} 🎉`);
    },
    onError: (err: any) => {
      if (err.response?.status === 429) {
        message.warning("You’ve reached the API limit. Please wait ⏳");
      } else if (err.response?.status === 500) {
        message.warning("Internal Server Error ⏳");
      } else {
        console.error(err);
      }
    },
  });
};

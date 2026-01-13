// CryptoContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import type { top20Coin, Top20Coins } from "../Hooks/useCoinbaseProducts";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useCurrency } from "./CurrencyContext";
import type { CoinbaseProduct } from "../types";

type CryptoPrices = Record<string, number>;

interface CryptoProviderProps {
  children: ReactNode;
  enableLivePrices: boolean;
  coins: top20Coin[];
  coinIds: string[]; // e.g. "BTC-USD"
}

// Create context
const CryptoContext = createContext<CryptoPrices | null>(null);

// Provider component
export const CryptoProvider: React.FC<CryptoProviderProps> = ({
  children,
  coinIds,
  enableLivePrices,
  coins,
}) => {
  const [prices, setPrices] = useState<CryptoPrices>({});
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://ws-feed.exchange.coinbase.com"
  );

  //   console.log('coinIds>>>', coinIds);
  useEffect(() => {
    if (!coinIds) return;

    if (readyState === ReadyState.OPEN && enableLivePrices && coinIds.length) {
      sendJsonMessage({
        type: "subscribe",
        product_ids: coinIds,
        channels: ["ticker"],
      });
    }
  }, [readyState, enableLivePrices, coinIds]);

  useEffect(() => {
    if (!lastJsonMessage) return;

    if (lastJsonMessage.type === "ticker" || lastJsonMessage.type === "ticker_batch") {
      const updates = Array.isArray(lastJsonMessage) ? lastJsonMessage : [lastJsonMessage];

      updates.forEach((msg: any) => {
        const { product_id, price } = msg;
        if (product_id && price) {
          setPrices(prev => ({ ...prev, [product_id]: Number(price) }));
        }
      });
    }
  }, [lastJsonMessage]);

  return (
    <CryptoContext.Provider value={prices}>{children}</CryptoContext.Provider>
  );
};

// Custom hook to access prices
export const useTickerPrice = (coinId: string) => {
  const prices = useContext(CryptoContext);
  if (!prices)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return prices[coinId];
};

// CryptoContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type CryptoPrices = Record<string, number>;

interface CryptoProviderProps {
  children: ReactNode;
  enableLivePrices: boolean;
  coins: any[];
  coinIds: string[]; // e.g. "BTC-USD"
}

// Create context
const CryptoContext = createContext<CryptoPrices | null>(null);

// Provider component
export const CryptoProvider: React.FC<CryptoProviderProps> = ({
  children,
  coinIds,
  enableLivePrices,
  // coins,
}) => {
  const [prices, setPrices] = useState<CryptoPrices>({});
  // const queryClient = useQueryClient();
  // const { currency } = useCurrency();
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://ws-feed.exchange.coinbase.com"
  );

  //   console.log('coinIds>>>', coinIds);

  interface TickerMessage {
    type: "ticker" | "ticker_batch";
    // add other properties if needed
    [key: string]: any;
  }

  const msg = lastJsonMessage as TickerMessage;

  useEffect(() => {
    if (!coinIds) return;

    if (readyState === ReadyState.OPEN && !enableLivePrices) {
      sendJsonMessage({
        type: "unsubscribe",
        product_ids: coinIds,
        channels: ["ticker"],
      });
    }

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

    if (msg.type === "ticker" || msg.type === "ticker_batch") {
      const updates = Array.isArray(lastJsonMessage)
        ? lastJsonMessage
        : [lastJsonMessage];

      updates.forEach((msg: any) => {
        const { product_id, price } = msg;
        if (product_id && price) {
          setPrices((prev) => ({ ...prev, [product_id]: Number(price) }));
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

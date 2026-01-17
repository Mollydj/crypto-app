import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type CryptoPrices = Record<
  string,
  {
    price: number;
    price_percentage_change_24h: number;
    price_difference: number;
    price_difference_percent: number;
  }
>;

interface CryptoProviderProps {
  children: ReactNode;
  enableLivePrices: boolean;
  coinIds: string[];
}

// Create context
export const CryptoContext = createContext<CryptoPrices | null>(null);

// Provider component
export const CryptoProvider: React.FC<CryptoProviderProps> = ({
  children,
  coinIds,
  enableLivePrices,
}) => {
  const [prices, setPrices] = useState<CryptoPrices>({});
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://ws-feed.exchange.coinbase.com",
  );

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

    console.log("lastJsonMessage>>", lastJsonMessage);
    const updates = Array.isArray(lastJsonMessage)
      ? lastJsonMessage
      : [lastJsonMessage];

    updates.forEach((msg: any) => {
      const { price, product_id, open_24h } = msg;
      if (price && product_id && open_24h) {
        const priceNum = Number(price);
        const open24h = Number(open_24h);
        const change24h = ((priceNum - open24h) / open24h) * 100;
        const priceDifference = priceNum - open24h;
        const percentageChange = ((priceNum - open24h) / open24h) * 100;
        // const previousPrice = priceNum - priceNum / (1 + change24h / 100);
        // const delta = priceNum - previousPrice;
        // const percentChange = ((priceNum - previousPrice) / previousPrice) * 100;
        setPrices((prev) => ({
          ...prev,
          [product_id]: {
            price: priceNum,
            price_percentage_change_24h: change24h,
            price_difference: priceDifference,
            price_difference_percent: percentageChange,
            // previous_price: delta,
            // percentChange: percentChange
          },
        }));
      }
    });
  }, [lastJsonMessage]);

  return (
    <CryptoContext.Provider value={prices}>{children}</CryptoContext.Provider>
  );
};

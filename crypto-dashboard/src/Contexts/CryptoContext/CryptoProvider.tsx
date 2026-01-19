import React, { useEffect, useState, ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CryptoContext } from "./CryptoContext";

interface CryptoProviderProps {
  children: ReactNode;
  enableLivePrices: boolean;
  coinIds: string[];
}

export interface CoinbaseTicker {
  type: "ticker";
  sequence: number;
  product_id: string;
  price: string;
  open_24h: string;
  volume_24h: string;
  low_24h: string;
  high_24h: string;
  volume_30d: string;
  best_bid: string;
  best_bid_size: string;
  best_ask: string;
  best_ask_size: string;
  side: "buy" | "sell";
  time: string;
  trade_id: number;
  last_size: string;
  price_percentage_change_24h: string;
  
}

export type CryptoPricesMap = Record<string, Partial<CoinbaseTicker>>;

export const CryptoProvider: React.FC<CryptoProviderProps> = ({
  children,
  coinIds,
  enableLivePrices,
}) => {
  const [prices, setPrices] = useState<CryptoPricesMap>({});
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://ws-feed.exchange.coinbase.com",
  );

  useEffect(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        console.log("[Coinbase Websocket] Connecting…");
        break;
      case ReadyState.OPEN:
        console.log("[Coinbase Websocket] Connection open ✅");
        break;
      case ReadyState.CLOSING:
        console.log("[Coinbase Websocket] Closing…");
        break;
      case ReadyState.CLOSED:
        console.log("[Coinbase Websocket] Connection closed ❌");
        break;
      case ReadyState.UNINSTANTIATED:
        console.log("[Coinbase Websocket] Not instantiated ⚠️");
        break;
      default:
        console.log("[Coinbase Websocket] Unknown state:", readyState);
        break;
    }
  }, [readyState]);

  useEffect(() => {
    if (!coinIds?.length || readyState !== ReadyState.OPEN) return;

    sendJsonMessage({
      type: enableLivePrices ? "subscribe" : "unsubscribe",
      product_ids: coinIds,
      channels: ["ticker"],
    });
  }, [readyState, enableLivePrices, coinIds, sendJsonMessage]);

  useEffect(() => {
    if (!lastJsonMessage || !enableLivePrices) return;

    const updates = Array.isArray(lastJsonMessage)
      ? lastJsonMessage
      : [lastJsonMessage];

    updates.forEach((msg: CoinbaseTicker) => {
      const { price, product_id, open_24h, time, side } = msg;
      if (price && product_id && open_24h) {
        const priceNum = Number(price);
        const open24h = Number(open_24h);
        const change24h = ((priceNum - open24h) / open24h) * 100;

        setPrices((prev) => ({
          ...prev,
          [product_id]: {
            ...prev[product_id],
            price: price,
            price_percentage_change_24h: change24h.toString(),
            side,
            new_at: time,
          },
        }));
      }
    });
  }, [lastJsonMessage, enableLivePrices]);

  return (
    <CryptoContext.Provider value={prices}>{children}</CryptoContext.Provider>
  );
};

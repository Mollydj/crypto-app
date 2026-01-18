import React, { createContext, useEffect, useState, ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CoinbaseProductNormalized } from "../../Hooks/useCoinbaseProductById";

interface CryptoProviderProps {
  children: ReactNode;
  enableLivePrices: boolean;
  coinIds: string[];
}

type CryptoPricesMap = Record<string, Partial<CoinbaseProductNormalized>>;

export const CryptoContext = createContext<CryptoPricesMap>({});

export const CryptoProvider: React.FC<CryptoProviderProps> = ({
  children,
  coinIds,
  enableLivePrices,
}) => {
  const [prices, setPrices] = useState<CryptoPricesMap>({});
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://ws-feed.exchange.coinbase.com"
  );

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

    updates.forEach((msg: any) => {
      const { price, product_id, open_24h, time, side } = msg;
      if (price && product_id && open_24h) {
        const priceNum = Number(price);
        const open24h = Number(open_24h);
        const change24h = ((priceNum - open24h) / open24h) * 100;

        setPrices((prev) => ({
          ...prev,
          [product_id]: {
            ...prev[product_id],
            price: priceNum,
            price_percentage_change_24h: change24h,
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

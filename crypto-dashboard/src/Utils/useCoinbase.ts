import { useEffect, useRef, useState } from 'react';

type PriceMap = Record<string, number>;

export const useCoinbaseTicker = (products: string[]) => {
  const [prices, setPrices] = useState<PriceMap>({});
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!products.length) return;

    const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        product_ids: products,
        channels: ['ticker'],
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'ticker') {
        setPrices(prev => ({
          ...prev,
          [data.product_id]: Number(data.price),
        }));
      }
    };

    return () => {
      ws.close();
    };
  }, [products]);

  return prices;
};

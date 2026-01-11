import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Coin = {
  symbol: string;
  name: string;
  price: number;
  market_cap: number;
  icon: string;
};

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY_FREE;

export const useCryptoList = (currency: string) => {
  const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=${API_KEY}`;
  console.log('Fetching data from URL:', API_URL);
  return useQuery<Coin[], Error>({
    queryKey: ['cryptoList', currency],
    queryFn: async () => {
      const { data } = await axios.get(API_URL, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      console.log('API response data:', data);
      return data;
    },
    staleTime: 1000 * 60,
  });
};


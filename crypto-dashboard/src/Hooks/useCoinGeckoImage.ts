import { useQuery } from "@tanstack/react-query";
import api from "../Utils/handleEvents";

export const useCoinImage = () =>
  useQuery<string, Error>({
    queryKey: ["coinImage"], // single key since only 1 coin
    queryFn: async () => {
      const { data } = await api.get("/api/cryptoImage"); // hits server endpoint
      return data.coinImage; // returns the image URL
    },
  });
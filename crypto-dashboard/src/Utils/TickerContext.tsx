// CryptoContext.tsx
import {
  useContext,
} from "react";
import { CryptoContext } from "./CryptoContext";

export const useTickerPrice = () => {
  const prices = useContext(CryptoContext);
  if (!prices)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return prices;
};

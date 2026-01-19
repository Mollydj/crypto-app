import { createContext, useContext } from "react";
import { CurrencyContextType } from "./CurrencyProvider";

export const defaultCurrency: CurrencyContextType = {
  currency: "USD",
  setCurrency: () => {},
};


export const CurrencyContext = createContext<CurrencyContextType>(defaultCurrency);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};

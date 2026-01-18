import { createContext, useContext, useState, type ReactNode } from "react";

export type CurrencyType = "EUR" | "GBP" | "USD";

export interface CurrencyContextType {
  currency: "EUR" | "GBP" | "USD";
  setCurrency: (currency: "EUR" | "GBP" | "USD") => void;
}
const defaultCurrency: CurrencyContextType = {
  currency: "USD",
  setCurrency: () => {},
};

const CurrencyContext = createContext<CurrencyContextType>(defaultCurrency);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyContextType["currency"]>(
    defaultCurrency.currency,
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};

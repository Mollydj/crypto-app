import { useState, type ReactNode } from "react";
import { CurrencyContext, defaultCurrency } from "./CurrencyContext";

export type CurrencyType = "EUR" | "GBP" | "USD";

export interface CurrencyContextType {
  currency: "EUR" | "GBP" | "USD";
  setCurrency: (currency: "EUR" | "GBP" | "USD") => void;
}

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

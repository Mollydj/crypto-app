import React, { createContext, useContext, useState } from "react";

interface EnableLivePricesType {
  enableLivePrices: boolean;
  setEnableLivePrices: (value: boolean) => void;
}

const EnableLivePrices = createContext<EnableLivePricesType | undefined>(undefined);

export const EnableLivePricesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enableLivePrices, setEnableLivePrices] = useState(true);
  return (
    <EnableLivePrices.Provider value={{ enableLivePrices, setEnableLivePrices }}>
      {children}
    </EnableLivePrices.Provider>
  );
};

export const EnableLivePricesContext = () => {
  const context = useContext(EnableLivePrices);
  if (!context) throw new Error("EnableLivePrices must be used within EnableLivePricesProvider");
  return context;
};

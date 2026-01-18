import { createContext, useContext } from "react";

export interface SelectedCoinType {
  selectedCoin: string;
  setSelectedCoin: (selectedCoin: string) => void;
}

export const defaultSelectedCoin: SelectedCoinType = {
  selectedCoin: "",
  setSelectedCoin: () => {},
};

export const SelectedCoinContext =
  createContext<SelectedCoinType>(defaultSelectedCoin);

export const useSelectedCoin = () => {
  const context = useContext(SelectedCoinContext);
  if (!context)
    throw new Error(
      "useSelectedCoin must be used within a SelectedCoinProvider",
    );
  return context;
};

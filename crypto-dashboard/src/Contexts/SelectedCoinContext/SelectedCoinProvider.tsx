import { useState } from "react";
import {
  SelectedCoinType,
  SelectedCoinContext,
  defaultSelectedCoin,
} from "./SelectedCoinContext";

export const SelectedCoinContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedCoin, setSelectedCoin] = useState<
    SelectedCoinType["selectedCoin"]
  >(defaultSelectedCoin.selectedCoin);

  return (
    <SelectedCoinContext.Provider value={{ selectedCoin, setSelectedCoin }}>
      {children}
    </SelectedCoinContext.Provider>
  );
};

import React from "react";
import { Segmented } from "antd";
import { CurrencyType, useCurrency } from "../../Contexts/CurrencyContext";
import { useMessageApi } from "../../Contexts/MessageContext";

const SelectCurrency: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
   const messageApi = useMessageApi();
  return (
    <Segmented<CurrencyType>
      options={["EUR", "GBP", "USD"]}
      value={currency}
      onChange={(value: CurrencyType) => {
        setCurrency(value);
        messageApi.success(`Currency change to ${value}`);
      }}
      block
    />
  );
};

export default SelectCurrency;

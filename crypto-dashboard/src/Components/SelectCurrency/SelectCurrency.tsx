import React from "react";
import { Segmented } from "antd";
import { CurrencyType } from "../../Contexts/CurrencyContext/CurrencyProvider";
import { useMessageApi } from "../../Contexts/MessagesContext/MessageContext";
import { useCurrency } from "../../Contexts/CurrencyContext/CurrencyContext";

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

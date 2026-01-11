import React from "react";
import { message } from "antd";
import { useCurrency } from "../../Utils/CurrencyContext";
import CryptoButton from "../Button/Button";

const SelectCryptoCurrency: React.FC = () => {
  const { setCurrency } = useCurrency();
  const key = "updatable";

  const currencyOptions = ["USD", "EUR", "GBP"];

  const openMessage = (curr: string) => {
    message.open({
      key,
      type: "loading",
      content: "Changing Currency...",
    });
    setTimeout(() => {
      message.success({
        key,
        type: "success",
        content: `${curr} Loaded!`,
        duration: 2,
      });
    }, 1000);
  };

  return (
    <>
      <div className="select-currency">
        {currencyOptions.map((curr) => (
          <CryptoButton
            key={curr}
            onClick={() => {
              setCurrency(curr);
              openMessage(curr);
            }}
          >
            {curr}
          </CryptoButton>
        ))}
      </div>
    </>
  );
};

export default SelectCryptoCurrency;

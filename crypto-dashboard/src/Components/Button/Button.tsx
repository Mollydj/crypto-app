import React from "react";
import "./Button.less";
import { useCurrency } from "../../Utils/CurrencyContext";

interface Coin {}

interface CardProps {
  children: string;
  onClick: () => void;
}

const Button: React.FC<CardProps> = ({ children, onClick }) => {

  return (
    <button onClick={onClick} className="crypto-button">
      {children}
    </button>
  );
};

export default Button;

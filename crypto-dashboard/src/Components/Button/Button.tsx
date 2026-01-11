import React from "react";
import { Button, type ButtonProps } from "antd";

const CryptoButton: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <Button {...restProps} className="crypto-button">
      {children}
    </Button>
  );
};

export default CryptoButton;

import { Tooltip } from "antd";
import { ReactNode } from "react";
import './CryptoTooltip.less';

interface CryptoTooltipProps {
  title: string;
  children: ReactNode;
}

const CryptoTooltip: React.FC<CryptoTooltipProps> = ({ title, children }) => (
  <Tooltip title={title} placement="top">
    <span className="crypto-tooltip">{children}</span>
  </Tooltip>
);

export default CryptoTooltip;

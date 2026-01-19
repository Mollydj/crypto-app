import { LoadingOutlined } from "@ant-design/icons";
import "./CryptoLoader.less";

interface CryptoLoaderProps {
  hideText?: boolean;
}

const CryptoLoader = ({ hideText = false }: CryptoLoaderProps) => {
  return (
    <div className="crypto-loader-container">
      {!hideText ? <p className="crypto-loader">Loading Crypto Data</p> : null}
      <LoadingOutlined />
    </div>
  );
};

export default CryptoLoader;

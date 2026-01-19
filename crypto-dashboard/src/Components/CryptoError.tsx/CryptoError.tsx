import CryptoButton from "../Button/Button";
import "./CryptoError.less";

// interface CryptoErrorProps {
//   showText?: boolean;
// }

const CryptoError = () => {
  return (
    <div className="crypto-error-container">
      <h1 className="crypto-error">Error Loading Data</h1>
      <p>Please open an issue on </p>
      <CryptoButton
        danger
        type="primary"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/mollydeangelisjimenez/",
            "_blank",
          )
        }
      >
        Github
      </CryptoButton>
    </div>
  );
};

export default CryptoError;

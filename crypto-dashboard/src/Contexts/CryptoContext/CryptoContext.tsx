import { createContext } from "react";
import { CryptoPricesMap } from "./CryptoProvider";

export const CryptoContext = createContext<CryptoPricesMap>({});

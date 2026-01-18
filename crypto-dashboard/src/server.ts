import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const normalize = (url?: string) => url?.replace(/\/$/, "");

const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "")
  .split(",")
  .map(normalize)
  .filter(Boolean);

console.log("✅ Allowed origins:", allowedOrigins);

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const normalizedOrigin = normalize(origin);
      console.log("🌍 Incoming origin:", normalizedOrigin);
      if (!normalizedOrigin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      console.warn("⚠️ Origin not in allowlist:", normalizedOrigin);
      return callback(null, true);
    },
  }),
);

const KEY_SECRET = process.env.COINBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!KEY_SECRET || !process.env.COINBASE_KEY_NAME) {
  throw new Error("Coinbase credentials missing");
}

function generateJWT() {
  const payload = { sub: "user123" };
  // @ts-ignore
  const token = jwt.sign(payload, KEY_SECRET, {
    algorithm: "ES256",
    expiresIn: "1h",
    header: {
      kid: process.env.COINBASE_KEY_NAME,
    },
  });
  return token;
}

const token = generateJWT();

// TODO RENAME THIS CALL
app.get("/api/marketcap", async (_req, res) => {
  try {
    const coinbaseResponse = await axios.get(
      "https://api.coinbase.com/api/v3/brokerage/market/products?product_type=UNKNOWN_PRODUCT_TYPE&contract_expiry_type=UNKNOWN_CONTRACT_EXPIRY_TYPE&expiring_contract_status=UNKNOWN_EXPIRING_CONTRACT_STATUS&products_sort_order=PRODUCTS_SORT_ORDER_VOLUME_24H_DESCENDING",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.json(coinbaseResponse.data);
    console.log("TOP 20 COINS SUCCESS", token);
  } catch (err: unknown) {
    // @ts-ignore
    console.error("Coinbase error:", err.response?.data || err.message);
    res.status(500).json({ error: "Coinbase request failed" });
  }
});

// TODO RENAME THIS CALL
app.get("/api/marketcapid", async (_req, res) => {
  const { coin } = _req.query;
  try {
    const response = await axios.get(
      `https://api.coinbase.com/api/v3/brokerage/market/products/${coin}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COINBASE_API_TOKEN}`,
        },
      },
    );
    res.json(response.data);
    console.log("SUCCESS: BTC-USD fetched");
  } catch (err: unknown) {
    // @ts-ignore
    console.error("Coinbase error:", err.response?.data || err.message);
    res.status(500).json({ error: "Coinbase request failed" });
  }
});

const PORT = process.env.PORT || 3001;
console.log("PORT>>", PORT);
// @ts-ignore
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`),
);

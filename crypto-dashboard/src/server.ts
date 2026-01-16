import "dotenv/config";
// import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",") || [];

if (allowedOrigins.length === 0) {
  throw new Error("Origin Base URL not found");
}

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // allow server-to-server / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
  })
);

// app.options('*', cors());

const KEY_SECRET = process.env.COINBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!KEY_SECRET || !process.env.COINBASE_KEY_NAME) {
  throw new Error('Coinbase credentials missing');
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

app.get("/api/crypto", async (_req, res) => {
  const { currency = "EUR" } = _req.query;
  try {
    const token = generateJWT();

    const coinbaseResponse = await axios.get(
      "https://api.coinbase.com/api/v3/brokerage/market/products/?&products_sort_order=PRODUCTS_SORT_ORDER_VOLUME_24H_DESCENDING",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(coinbaseResponse.data);
    console.log("TOP 20 COINS SUCCESS");
  } catch (err: unknown) {
    // @ts-ignore
    console.error("Coinbase error:", err.response?.data || err.message);
    res.status(500).json({ error: "Coinbase request failed" });
  }
});

app.get("/api/cryptoImage", async (req, res) => {
  // @ts-ignore
  const coinSymbol = req.query.coin?.toLowerCase();
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinSymbol}`;
  const apiKey = process.env.VITE_COINGECKO_API_KEY_FREE; // optional, if using Pro API

  try {
    const response = await axios.get(apiUrl, {
      params: {
        localization: false,
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
      headers: {
        "x-cg-pro-api-key": apiKey,
      },
    });

    // Extract large image, fallback if missing
    const coinImage = response.data?.image?.large;

    res.json({ coin: coinSymbol, coinImage });
    // @ts-ignore
  } catch (err: unknown) {
    // @ts-ignore
    console.error("Error fetching coin image:", err.message || err);
    // fallback even on error
    res.json({
      coin: coinSymbol,
      coinImage: `https://cryptoicons.org/api/icon/${coinSymbol}/200`,
    });
  }
});


const PORT = process.env.PORT || 3001;
console.log("PORT>>", PORT);
// @ts-ignore
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

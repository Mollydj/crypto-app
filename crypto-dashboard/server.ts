import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

import express from "express";
import cors from "cors";
import axios from "axios";
import { generateJWT } from "./generateTokenPRIVATE.ts";

const app = express();
app.use(cors());

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
  } catch (err) {
    console.error("Coinbase error:", err.response?.data || err.message);
    res.status(500).json({ error: "Coinbase request failed" });
  }
});

app.get("/api/cryptoImage", async (req, res) => {
  const coinSymbol = req.query.coin?.toLowerCase() || "bitcoin";
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
  } catch (err) {
    console.error("Error fetching coin image:", err.message || err);
    // fallback even on error
    res.json({
      coin: coinSymbol,
      coinImage: `https://cryptoicons.org/api/icon/${coinSymbol}/200`,
    });
  }
});



const PORT = process.env.PORT || 3001;
console.log('PORT>>', PORT);
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/crypto", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});


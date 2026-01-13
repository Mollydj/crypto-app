import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import axios from "axios";
import { generateToken } from "./generateToken.ts";

const app = express();
app.use(cors());

const HOST = "api.coinbase.com";

app.get("/api/crypto", async (req, res) => {
  const { currency = "EUR" } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: currency.toUpperCase(),
          order: "market_cap_desc",
          per_page: 20,
          page: 1,
        },
      }
    );
    res.json(data);
    console.log("Fetched crypto data successfully");
  } catch (err) {
    console.error(
      "CoinGecko fetch error:",
      err.response?.data || err.message || err
    );
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
});

const url =
  "https://api.coinbase.com/api/v3/brokerage/market/products?product_type=UNKNOWN_PRODUCT_TYPE&contract_expiry_type=UNKNOWN_CONTRACT_EXPIRY_TYPE&expiring_contract_status=UNKNOWN_EXPIRING_CONTRACT_STATUS&products_sort_order=PRODUCTS_SORT_ORDER_UNDEFINED";

app.get("/api/products", async (_req, res) => {
  try {
    const path = "/api/v3/brokerage/market/products";
    const token = await generateToken("GET", path);

    console.log("JWT preview:", token.slice(0, 40));

    const response = await axios.get(
      `https://${HOST}${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Coinbase error:", err.response?.data || err.message);
    res.status(500).json({ error: "Coinbase request failed" });
  }
});


app.listen(3001, () => console.log("Server running on port 3001"));

// server.js / api/prices
import express from "express";
import cors from "cors";
import api from "./src/Utils/handleEvents.ts";

const app = express();

app.use(cors());

app.get("/api/crypto", async (req, res) => {
  const { currency = "EUR" } = req.query;
  try {
    const { data } = await api.get(
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

app.listen(3001, () => console.log("Server running on port 3001"));

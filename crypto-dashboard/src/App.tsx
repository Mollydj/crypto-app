// import React from "react";
import { useEffect, useState } from "react";
import "./App.less";
import Card from "./Components/Card/Card";
import { useCryptoList } from "./Hooks/useCryptoList";
import Button from "./Components/Button/Button";
import { useCurrency } from "./Utils/CurrencyContext.tsx";

function App() {
  const { currency, setCurrency } = useCurrency();
  const { data: coins, isLoading, isError, error } = useCryptoList(currency);

  useEffect(() => {
    console.log("Selected currency:", currency[0]);
  }, [currency]);
  return (
    <>
      <div id="header">
        <h1>Crypto-graphy</h1>
        <div className="select-currency">
          <Button onClick={() => setCurrency("USD")}>USD</Button>
          <Button onClick={() => setCurrency("EUR")}>EUR</Button>
          <Button onClick={() => setCurrency("GBP")}>GBP</Button>
        </div>
      </div>
      <div id="content">
        <div className="content-section">
        <h2>Top 20 by Market Cap</h2>
          <Card coins={coins} currency={currency} />
        </div>
        <h2>Next thing</h2>
        {/* <div className="card-container">
          <Card coins={[]} />
        </div> */}
      </div>
      <div id="footer">
        <div>
          <p>
            Designed and coded by <Button>MollyDJ</Button>
          </p>
        </div>
        <div className="resources">
          <Button onClick={"https://www.coingecko.com/"}>API</Button>
          <Button onClick={"https://www.coingecko.com/"}>LinkedIn</Button>
        </div>
      </div>
    </>
  );
}

export default App;

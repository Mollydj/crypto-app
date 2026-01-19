// src/Components/CryptoCard/CryptoCard.test.tsx
import { render, screen } from "@testing-library/react";
import CryptoCard from "./CryptoCard";
import { CurrencyProvider } from "../../Contexts/CurrencyContext/CurrencyContext";
import { describe, it, expect } from "vitest";
import { mockCoins } from "../../test/MockData";
import { EnableLivePricesProvider } from "../../Contexts/EnableLivePricesContext/EnableLivePricesContext";
import { SelectedCoinContextProvider } from "../../Contexts/SelectedCoinContext/SelectedCoinProvider";

describe("CryptoCard with App contexts", () => {
  const defaultCurrency = { currency: "USD", setCurrency: () => {} };
  const defaultLivePrices = {};
  const defaultMessageApi = {};

  it("renders the top movers list with mock coins", () => {
    render(
      <CurrencyProvider>
        <EnableLivePricesProvider value={{ enableLivePrices: false }}>
          <SelectedCoinContextProvider coins={mockCoins}>
            <CryptoCard
              coins={mockCoins}
              isLoading={false}
              lastFetchedTimestamp={new Date().toISOString()}
              currency={defaultCurrency}
              livePrices={defaultLivePrices}
              messageApi={defaultMessageApi}
            />
          </SelectedCoinContextProvider>
        </EnableLivePricesProvider>
      </CurrencyProvider>
    );
    expect(screen.getByText(/Top Movers/i)).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("shows loading state when isLoading=true", () => {
    render(
      <CurrencyProvider>
        <EnableLivePricesProvider value={{ enableLivePrices: false }}>
          <SelectedCoinContextProvider coins={mockCoins}>
            <CryptoCard
              coins={mockCoins}
              isLoading={true}
              lastFetchedTimestamp={new Date().toISOString()}
              currency={defaultCurrency}
              livePrices={defaultLivePrices}
              messageApi={defaultMessageApi}
            />
          </SelectedCoinContextProvider>
        </EnableLivePricesProvider>
      </CurrencyProvider>
    );

    screen.debug();
    const loading = screen.getByRole("img");
    expect(loading).toBeInTheDocument();
  });

  it("renders placeholder when no coins", () => {
    render(
      <CurrencyProvider>
        <EnableLivePricesProvider value={{ enableLivePrices: false }}>
          <SelectedCoinContextProvider coins={[]}>
            <CryptoCard
              coins={[]}
              isLoading={false}
              lastFetchedTimestamp={""}
              currency={defaultCurrency}
              livePrices={defaultLivePrices}
              messageApi={defaultMessageApi}
            />
          </SelectedCoinContextProvider>
        </EnableLivePricesProvider>
      </CurrencyProvider>
    );

    expect(screen.queryByText("Bitcoin")).not.toBeInTheDocument();
    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
  });
});

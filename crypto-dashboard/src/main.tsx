import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { CurrencyProvider } from "./Utils/CurrencyContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrencyProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CurrencyProvider>
  </React.StrictMode>
);

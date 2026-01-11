import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyProvider } from "./Utils/CurrencyContext";

const queryClient = new QueryClient();

// Custom colors
const primaryColor = "#00ff00";
const backgroundColor = "#242424";

const customTheme = {
  components: {
    Layout: {
      bodyBg: backgroundColor,
      footerBg: primaryColor,
      colorText: primaryColor,
    },
    Switch: {
      colorPrimary: primaryColor,
      colorPrimaryHover: primaryColor,
      colorBgContainer: backgroundColor,
      colorBorder: primaryColor,
      colorBgHover: primaryColor,
      colorBgActive: primaryColor,
      colorTextLightSolid: backgroundColor,
    },
    Button: {
      colorText: backgroundColor,
      colorPrimary: primaryColor,
      colorBgContainer: primaryColor,
      defaultHoverColor: backgroundColor,
      defaultHoverBorderColor: primaryColor,
      defaultHoverBg: backgroundColor,
      defaultActiveBorderColor: backgroundColor,
      defaultActiveColor: backgroundColor,
      colorLink: primaryColor,
      colorLinkActive: primaryColor,
      colorLinkHover: primaryColor,
      colorPrimaryActive: primaryColor,
      colorPrimaryBg: primaryColor,
      colorTextLightSolid: backgroundColor,
      colorPrimaryHover: backgroundColor,
      colorPrimaryBorder: primaryColor,
      defaultBorderColor: backgroundColor,
      ghostBg: primaryColor,
      defaultGhostBorderColor: primaryColor,
    },
  },
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Cast JSX to ReactNode for TS safety
const appNode = (
  <CurrencyProvider>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: { fontFamily: "VT323, monospace" },
          components: customTheme.components,
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </CurrencyProvider>
) as React.ReactNode;

ReactDOM.createRoot(rootElement).render(<React.StrictMode>{appNode}</React.StrictMode>);

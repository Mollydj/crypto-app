import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyProvider } from "./Contexts/CurrencyContext/CurrencyContext";
import { EnableLivePricesProvider } from "./Contexts/EnableLivePricesContext/EnableLivePricesContext";
import { SelectedCoinContextProvider } from "./Contexts/SelectedCoinContext/SelectedCoinProvider";
const queryClient = new QueryClient();

// CUSTOM COLORS
export const primaryColor = "#00ff00";
export const backgroundColor = "#242424";
export const secondaryBackgroundColor = "#686767";
export const secondaryTextColor = "#FAEBD7";
export const dangerColor = "#ff4d4d";

const customTheme = {
  components: {
    Message: {
      contentBg: primaryColor,
      colorText: backgroundColor,
      colorSuccess: backgroundColor,
      colorError: dangerColor,
    },
    Tooltip: {
      colorBgSpotlight: primaryColor,
      colorTextLightSolid: backgroundColor,
      fontSize: 12,
    },
    Segmented: {
      itemColor: secondaryTextColor,
      colorText: primaryColor,
    },
    Pagination: {
      itemActiveColor: primaryColor,
      colorPrimary: primaryColor,
      colorBgTextHover: primaryColor,
      colorPrimaryHover: primaryColor,
      itemActiveColorHover: secondaryTextColor,
    },
    Layout: {
      bodyBg: backgroundColor,
      footerBg: primaryColor,
      colorText: primaryColor,
    },
    Switch: {
      colorPrimary: primaryColor,
      colorPrimaryHover: primaryColor,
      colorBgContainer: secondaryBackgroundColor,
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
const appNode = (
  <CurrencyProvider>
    <EnableLivePricesProvider>
      <SelectedCoinContextProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: { fontFamily: "VT323, monospace" },
            components: customTheme.components,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ConfigProvider>
      </SelectedCoinContextProvider>
    </EnableLivePricesProvider>
  </CurrencyProvider>
) as React.ReactNode;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>{appNode}</React.StrictMode>,
);

export interface CoinbaseProduct {
  price_difference: string;
  price_difference_percent: string;
  product_id: string;
  price: string;
  price_percentage_change_24h: string;
  volume_24h: string;
  volume_percentage_change_24h: string;
  base_increment: string;
  quote_increment: string;
  quote_min_size: string;
  quote_max_size: string;
  base_min_size: string;
  base_max_size: string;
  base_name: string;
  quote_name: string;
  watched: boolean;
  is_disabled: boolean;
  new: boolean;
  status: "online" | "offline" | string;
  cancel_only: boolean;
  limit_only: boolean;
  post_only: boolean;
  trading_disabled: boolean;
  auction_mode: boolean;
  product_type: "SPOT" | "FUTURE" | string;
  quote_currency_id: string;
  base_currency_id: string;
  fcm_trading_session_details: any | null;
  mid_market_price: string;
  alias: string;
  alias_to: string[];
  base_display_symbol: string;
  quote_display_symbol: string;
  view_only: boolean;
  price_increment: string | number;
  display_name: string;
  product_venue: string;
  approximate_quote_24h_volume: string;
  new_at: string;
  market_cap: string;
  base_cbrn: string;
  quote_cbrn: string;
  product_cbrn: string;
  icon_color: string;
  icon_url: string;
  display_name_overwrite: string;
  is_alpha_testing: boolean;
  about_description: string;
  [key: string]: unknown;
}


export const placeholderCoin: CoinbaseProduct = {
  price_difference: "0.00",
  price_difference_percent: "0.00",
  product_id: "",
  price: "0000.00",
  price_percentage_change_24h: "0",
  volume_24h: "0",
  volume_percentage_change_24h: "0",
  base_increment: "0",
  quote_increment: "0",
  quote_min_size: "0",
  quote_max_size: "0",
  base_min_size: "0",
  base_max_size: "0",
  base_name: "#",
  quote_name: "$$$",
  watched: false,
  is_disabled: false,
  new: false,
  status: "online",
  cancel_only: false,
  limit_only: false,
  post_only: false,
  trading_disabled: false,
  auction_mode: false,
  product_type: "SPOT",
  quote_currency_id: "XXX",
  base_currency_id: "XXX",
  fcm_trading_session_details: null,
  mid_market_price: "0",
  alias: "XXX-XXX",
  alias_to: [],
  base_display_symbol: "XXX",
  quote_display_symbol: "XXX",
  view_only: false,
  price_increment: "0.0001",
  display_name: "XXX-XXX",
  product_venue: "XXX",
  approximate_quote_24h_volume: "0",
  new_at: new Date(0).toISOString(),
  market_cap: "0",
  base_cbrn: "0",
  quote_cbrn: "0",
  product_cbrn: "0",
  icon_color: "#000000",
  icon_url: "",
  display_name_overwrite: "",
  is_alpha_testing: false,
  about_description: ""
};


export const placeHolderTop20Coins: CoinbaseProduct[] = Array(20).fill(placeholderCoin);


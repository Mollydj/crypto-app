export interface CoinbaseProduct {
  product_id: string;                     // e.g. "BTC-USDC"
  price: string;                          // e.g. "91385.99"
  price_percentage_change_24h: string;    // e.g. "-0.00001094259515"
  volume_24h: string;                     // e.g. "9311.26387126"
  volume_percentage_change_24h: string;   // e.g. "231.01079128672902"
  base_increment: string;                 // e.g. "0.00000001"
  quote_increment: string;                // e.g. "0.01"
  quote_min_size: string;                 // e.g. "1"
  quote_max_size: string;                 // e.g. "150000000"
  base_min_size: string;                  // e.g. "0.00000001"
  base_max_size: string;                  // e.g. "3400"
  base_name: string;                      // e.g. "Bitcoin"
  quote_name: string;                     // e.g. "USDC"
  watched: boolean;
  is_disabled: boolean;
  new: boolean;
  status: "online" | "offline" | string;  // e.g. "online"
  cancel_only: boolean;
  limit_only: boolean;
  post_only: boolean;
  trading_disabled: boolean;
  auction_mode: boolean;
  product_type: "SPOT" | "FUTURE" | string;
  quote_currency_id: string;              // e.g. "USDC"
  base_currency_id: string;               // e.g. "BTC"
  fcm_trading_session_details: any;       // null in example
  mid_market_price: string;               // empty in example
  alias: string;                          // e.g. "BTC-USD"
  alias_to: string[];
  base_display_symbol: string;            // e.g. "BTC"
  quote_display_symbol: string;           // e.g. "USD"
  view_only: boolean;
  price_increment: string;
  display_name: string;                   // e.g. "BTC-USDC"
  product_venue: string;                  // e.g. "CBE"
  approximate_quote_24h_volume: string;   // e.g. "850919067.03"
  new_at: string;                          // ISO date
  market_cap: string;
  base_cbrn: string;
  quote_cbrn: string;
  product_cbrn: string;
  icon_color: string;
  icon_url: string;
  display_name_overwrite: string;
  is_alpha_testing: boolean;
  about_description: string;
  [key: string]: any;                     // for any additional unknown fields
}

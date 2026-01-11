# crypto-app
 React Web App displaying live cryptocurrencies data ( prices, trends, and charts )

Header
 └─ Currency Selector - View your preferred cryptos in different currencies

Main Content
 ├─ Top 20 by Market Cap
 │    └─ CoinCard component (price, symbol, market cap)
 │    └─ Modal to see more crypto info
 └─ Top 10 Biggest Change (user-selected period)
      └─ CoinCard component (price, change %, maybe chart sparkline)
      └─ Modal to see more crypto info
      
Footer
 └─ Simple info / links / credits

 # To Do 
 ## Header
 [] - Display name of project
 [] - Currency Selector
      [] - Create Buttons for user to select their desired currency
      [] - Create a React context to store this value on change
[] - Content Section #1: Top 20 By Market Cap
      [] - Use CoinGecko, fetch the Top 20 cryptos by market cap
      [] - Use Free Coinbase Websocket API to display live price changes. Fetch these changes every 2 minutes and display the last saved time to the user
      [] - Make the current price a button which will open a modal
            [] -  CoinDetails Component
                  [] - Display the following informaton
[] - Content Section #2: TBD
[] - Footer
      [] - Display 



      


notes

“To bypass browser CORS restrictions when fetching crypto data from CoinGecko, I implemented a lightweight Express backend with CORS enabled. The React frontend calls this proxy server, which fetches the latest market data and returns it as JSON. This ensures smooth live updates and avoids cross-origin issues.”
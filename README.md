> ⚠️ Work in Progress
> 
> 
> This project is actively being developed. Features, UI, and architecture are evolving as I continue to iterate and improve the app.
> 

**🚀 Crypto Dashboard**

A modern cryptocurrency dashboard built with **React 19**, **Vite**, and **TanStack Query**, featuring real-time price updates, caching, and a retro terminal-inspired UI.

🔗 **Live Demo**

👉 [**https://mollydj.github.io/crypto-app/**](https://mollydj.github.io/crypto-app/)

---

**🧪 Run Locally**

```
git clone https://github.com/Mollydj/crypto-app.git
cd crypto-dashboard
yarn install
yarn dev
```

---

**✨ Feature Roadmap**

- 📈 Real-time crypto price update that can be toggled on/off
- 📈 Interactive Charts from Charts.js
- 🔄 Smart data fetching/caching using TanStack Query
- 🎨 Custom Ant Design theme design-system-driven UI with theme tokens & customization
- 🌍 Currency switching
- ⚡ Fast builds with Vite
- 🚀 Deployed on Netlify served from OnRender

---

**🧱 Tech Stack**

- ⚛️ **Modern React (v19) + Vite**
- 🟦 **TypeScript (full-stack)** — shared types, strict typing, scalable codebase
- 🎨 **Ant Design + LESS** —
- 🔄 **TanStack React Query**
- 📡 **Real-time data via WebSockets**
- 🪙 **Coinbase SDK integration**
- ⚙️ **Node.js + Express**
- 🔐 **Security-aware setup** — JWT, CORS, environment isolation
- 🧪 **Strong DX & quality gates** — (Airbnb)
- 🚀 **Cloud deployment** — frontend on Netlify/backend on Render

---

# Tasks

## 🧱 Foundation & Architecture

- [x]  Initial project setup with Vite + React 19
- [x]  Initial Ant Design theme
- [x]  Netlify deployment
- [x]  OnRender Deployment
- [ ]  Upgrade yarn version to yarn v3
- [ ]  Adjust chunk size with minifier for CSS
- [x]  Add logs to show Websocket state
- [ ]  Fix all TS and ESLint errors before implementing new features // IN PROGRESS
- [ ]  Unit tests
    - [x]  Top 20 tokens render correct with a snapshot
        - [x]  Success on retrieval of coins w/ snapshot
        - [x]  Spinner displays on loading w/ snapshot
        - [x]  Error page displays on api error w/ snapshot
    - [ ]  Coin Details page renders correctly with a snapshot // IN PROGRESS
        - [ ]  Success on retrieval of chart w/ snapshot
        - [ ]  Spinner displays on loading w/ snapshot
        - [ ]  Error page displays on api error w/ snapshoty
    - [ ]  Toggle Off/On live updates
    - [ ]  Test all links
        - [ ]  Readme link
        - [ ]  API
        - [ ]  Linkedin
        - [ ]  Github page
    

## 🔌 Data, API & State

- [x]  Coinbase API integration
- [x]  Live updates via WebSocket
- [x]  Display timestamp for last live WebSocket call
- [ ]  [SPIKE]: Look into Lazy queries

## 📊 Core Product Features

- [x]  Fetch top 20 coins
- [x]  Display top 20 coins in a List
- [x]  Section 1 – Top 20 Coins by Market Cap
- [x]  Toggle on/off live updates
- [x]  Currency switcher
- [x]  Coin Detail Page
- [ ]  Allow users to favorite coins and save via localStorage

## 🧭 Navigation & Layout

- [x]  Create Sidepanel terminal component
- [x]  Add Header section with timestamp showing time of last live update
- [ ]  Adjust App for Mobile View

## 🎨 Design System & UI Polish

- [x]  Define Color Palette
- [ ]  Dark Mode / Light Mode Toggle
- [x]  Add LESS variables to all styling files - no hardcoded paddins, colors etc
- [x]  Add tooltips with information about each metric in statistics table

## 🚨 UX Feedback & States

- [x]  API Success Notification
- [x]  API Error Notification
- [x]  Style Error Page
- [x]  Style Loading Page
- [ ]  Add an alert stating the project is still under construction

## 🚀 Deployment (Completed)

- [x]  Deploy Backend to [OnRender.com](http://onrender.com/)
- [x]  Deploy frontend to Netlify
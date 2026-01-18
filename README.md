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
- [ ]  Fix all TS and ESLint errors before implementing new features
- [ ]  Unit tests

## 🔌 Data, API & State

- [x]  Coinbase API integration
- [x]  Live updates via WebSocket
- [ ]  [SPIKE]: Look into Lazy queries
- [ ]  Display if cached data is being used (message/text)
- [ ]  Display timestamp for last live WebSocket call

## 📊 Core Product Features

- [x]  Fetch top 20 coins
- [x]  Display top 20 coins in a List
- [x]  Section 1 – Top 20 Coins by Market Cap
- [x]  Toggle on/off live updates
- [x]  Currency switcher
- [x]  Coin Detail Page
- [ ]  Add Image to each coin card
- [ ]  Favorite coins via localStorage

## 🧭 Navigation & Layout

- [x]  Create Sidepanel terminal component
- [ ]  Add Header section with timestamp showing time of last live update
- [ ]  Adjust App for Mobile View

## 🎨 Design System & UI Polish

- [ ]  Define Color Palette
- [ ]  Dark Mode / Light Mode Toggle
- [ ]  Add LESS variables to all styling files - no hardcoded paddins, colors etc
- [ ]  Add tooltips with information about each metric in statistics table

## 🚨 UX Feedback & States

- [ ]  API Success Notification
- [ ]  API Error Notification
- [ ]  Show error message on endpoint failure or redirect to `/404.html`
- [ ]  Style Error Page
- [ ]  Style Loading Page
- [ ]  Add an alert stating the project is still under construction

## 🚀 Deployment (Completed)

- [x]  Deploy Backend to [OnRender.com](http://onrender.com/)
- [x]  Deploy frontend to Netlify
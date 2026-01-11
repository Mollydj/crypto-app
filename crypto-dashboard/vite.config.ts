import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/crypto-app/", // <-- your GitHub repo name
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});

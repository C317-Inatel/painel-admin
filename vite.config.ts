import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: "::",
  },
  base: '/painel-admin/',
  build: {
    sourcemap: mode === "development",
  },
}));

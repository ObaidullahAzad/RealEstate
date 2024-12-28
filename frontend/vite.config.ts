import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://realestate-o4z2.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

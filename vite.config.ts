import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const PWA_config: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  outDir: "dist",
  manifest: {
    name: "Genealogical Tree",
    short_name: "GenTree",
    description: "App for saving family history",
    icons: [
      {
        src: "icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
    },
  },
  plugins: [react(), VitePWA(PWA_config)],
  server: {
    port: 5101,
    host: true,
  },
});

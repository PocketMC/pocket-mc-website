
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.SITE_BASE || "/pocket-mc-website/",
  plugins: [react(), tailwindcss()],

  server: {
    allowedHosts: ["0.tcp.in.ngrok.io"],
  },

  preview: {
    allowedHosts: ["0.tcp.in.ngrok.io"],
  },
});

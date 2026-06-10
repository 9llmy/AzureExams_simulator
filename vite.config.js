import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE lets CI set the base path (GitHub Pages serves from /<repo-name>/).
// Vercel, Netlify, and Azure Static Web Apps serve from "/" — no change needed.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/AzureExams_simulator/",
});

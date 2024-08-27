import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.BRAIN_AGRICULTURE_API_URL": JSON.stringify(
      process.env.BRAIN_AGRICULTURE_API_URL
    ),
  },
});

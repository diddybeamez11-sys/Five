import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: ".",
  base: "./",
  publicDir: "public",
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist-mobile",
    emptyOutDir: true,
    sourcemap: false,
  },
  resolve: {
    tsconfigPaths: true,
  },
});

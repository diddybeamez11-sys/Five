import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const mobileRoot = fileURLToPath(new URL("./mobile", import.meta.url));
const publicDir = fileURLToPath(new URL("./public", import.meta.url));
const outDir = fileURLToPath(new URL("./dist-mobile", import.meta.url));

export default defineConfig({
  root: mobileRoot,
  base: "./",
  publicDir,
  plugins: [tailwindcss(), react()],
  build: {
    outDir,
    emptyOutDir: true,
    sourcemap: false,
  },
  resolve: {
    tsconfigPaths: true,
  },
});

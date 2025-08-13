import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
const buildTarget = process.env.BUILD_TARGET;
const environment = process.env.ENVIRONMENT;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: environment === "development" },
  ssr: buildTarget === "website",
  css: ["~/assets/css/tailwind.css"],
  nitro: {
    preset: buildTarget === "website" ? "node-server" : "static",
    serveStatic: buildTarget !== "website",
  },

  vite: {
    build: {
      emptyOutDir: true,
    },
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: "",
    componentDir: "~/components/ui",
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],
});

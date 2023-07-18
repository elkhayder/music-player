// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   // devtools: { enabled: true },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
   modules: ["@pinia/nuxt"],
   nitro: {
      serverAssets: [
         {
            baseName: "audio",
            dir: "./audio", // Relative to `srcDir` (`server/` for nuxt)
         },
      ],
   },
});

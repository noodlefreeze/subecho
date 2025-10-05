import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

export default defineConfig({
  manifest: {
    web_accessible_resources: [
      {
        resources: ['main-world.js'],
        matches: ['https://www.youtube.com/watch*'],
      },
    ],
  },
  modules: ['@wxt-dev/module-react'],
  imports: false,
  webExt: {
    startUrls: ['https://www.youtube.com/watch?v=mw2z9lV3W1g'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
})

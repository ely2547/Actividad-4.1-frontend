import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['robots.txt'], 
      registerType: 'autoUpdate', 
      manifest: {
        name: 'miapp',
        short_name: 'my',
        description: 'some descriptión',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pnge.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff'
      }
    })
  ],
});

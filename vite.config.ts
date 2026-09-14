import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import versionManifest from './VERSION.json';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: [
        'favicon.svg',
        'mark.svg',
        'icon.svg',
        'apple-touch-icon-180.png',
        'icon-192.png',
        'icon-512.png',
        'icon-1024.png',
        'icon-maskable-192.png',
        'icon-maskable-512.png',
      ],
      manifest: {
        name: 'AuraCap',
        short_name: 'AuraCap',
        description: 'Organize your iPhone, iPad and Mac setup.',
        theme_color: '#050507',
        background_color: '#050507',
        display: 'standalone',
        orientation: 'any',
        start_url: '/AuraCap/',
        categories: ['productivity', 'utilities'],
        shortcuts: [
          { name: 'Overview', short_name: 'Overview', url: '/AuraCap/dashboard', icons: [{ src: 'icon-192.png', sizes: '192x192' }] },
          { name: 'App Library', short_name: 'Apps', url: '/AuraCap/apps', icons: [{ src: 'icon-192.png', sizes: '192x192' }] },
        ],
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        cacheId: versionManifest.swCache,
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  base: '/AuraCap/',
});

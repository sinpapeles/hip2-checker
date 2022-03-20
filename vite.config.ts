import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/server.ts',
    }),
  ],
});

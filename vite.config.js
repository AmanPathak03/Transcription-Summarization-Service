import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Ensure output directory matches Vercel's setting
    sourcemap: true, // Optional: Helps with debugging on Vercel
  },
  server: {
    port: 5173, // Ensure Vite uses port 3000 for local development
  },
});

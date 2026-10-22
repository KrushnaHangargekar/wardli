import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        website: resolve(__dirname, 'website/index.html')
      }
    }
  },
  server: {
    port: 5173,
    open: false
  }
});

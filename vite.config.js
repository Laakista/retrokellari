import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        koneet: resolve(import.meta.dirname, 'koneet.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});

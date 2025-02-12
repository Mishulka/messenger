import { defineConfig } from 'vite';
import postcss from 'postcss';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
        main: resolve(__dirname, 'index.html')
    }
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  }
});
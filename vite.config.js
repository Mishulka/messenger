import { defineConfig } from 'vite';
import postcss from 'postcss';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  build: {
    outDir: './dist',
    sourcemap: true,
  },
  css: {
    modules: {
    },
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  },
  plugins: [
    handlebars()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'pages': fileURLToPath(new URL('./pages', import.meta.url)),
    }
  },
  assetsInclude: ['**/*.hbs']
});


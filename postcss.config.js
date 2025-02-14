// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-preset-env')(),
    require('autoprefixer'), // Автоматически добавляет префиксы для поддержки браузеров
    require('cssnano')({  // Минифицирует CSS
      preset: 'default',
    }),
    // require('postcss-nesting'), // Если вам нужен nesting, раскомментируйте
  ],
};
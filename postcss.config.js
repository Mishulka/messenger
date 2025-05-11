// postcss.config.js
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    postcssPresetEnv(),
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
  ],
};

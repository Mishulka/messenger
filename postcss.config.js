import  postcssPresentEnv from './postcss-present-env'
import autprefixer from './autoprefixer'

module.exports = {
  plugins: [
    postcssPresentEnv(),
    autoprefixer(),
  ]
}
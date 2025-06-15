export default {
  require: ['mocha-esm-loader'],
  extension: ['ts'],
  spec: 'src/**/*.test.ts',
  timeout: 5000,
  recursive: true
};

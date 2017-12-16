module.exports = {
  roots: [
    './src'
  ],

  moduleDirectories: [
    'node_modules',
    'src',
    'test-config',
  ],

  setupFiles: [
    'jest-localstorage-mock',
  ],

  globals: {
    'ENV': 'test',
  },

  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)(spec|test).js?(x)',
  ],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  timers: 'fake',
}

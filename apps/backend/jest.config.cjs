/** Minimal Common-JS config; Node ESM enabled via NODE_OPTIONS */
module.exports = {
  testEnvironment: 'node',
//   verbose: false,          // keep CI output short
  transform: {}            // disable Babel
};

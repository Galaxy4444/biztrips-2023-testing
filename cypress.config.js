const { defineConfig } = require('cypress');
const webpackConfig = require("./webpack.config.js");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig
    },
    indexHtmlFile: "cypress/support/component-index.html",
  },
});

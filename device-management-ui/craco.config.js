require('dotenv').config();
const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      context: ['/api', '/login', '/callback'],
      target: process.env.PROXY_TARGET_URL,
      changeOrigin: false,
      loglevel: 'debug',
    },
  },
};

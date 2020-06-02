const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  chainWebpack(config) {

    // remove JS prefetching
    // config.plugins.delete('prefetch');
    
    // GZIP  compression
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  }
}
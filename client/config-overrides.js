const path = require('path');
const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    url: require.resolve('url'),
    path: require.resolve('path-browserify'),
    https: require.resolve('https-browserify'),
    http: require.resolve('stream-http'),
    os: require.resolve('os-browserify/browser'),
    constants: require.resolve('constants-browserify'),
    zlib: require.resolve('browserify-zlib'),
    fs: false,
    net: false,
    tls: false,
    process: require.resolve('process/browser'),
  };

  // Add process global
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  config.resolve.alias = {
    ...config.resolve.alias,
    'drizzle-react': path.resolve(__dirname, 'src/drizzle-shim.js'),
    'drizzle-react-components': path.resolve(__dirname, 'src/drizzle-shim.js'),
  };

  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf = rule.oneOf.map(oneOfRule => {
        if (oneOfRule.use) {
          oneOfRule.use = oneOfRule.use.map(use => {
            if (use.loader && use.loader.includes('postcss-loader')) {
              return {
                ...use,
                options: {
                  ...use.options,
                  postcssOptions: { plugins: [] },
                },
              };
            }
            return use;
          });
        }
        return oneOfRule;
      });
    }
    return rule;
  });

  return config;
};
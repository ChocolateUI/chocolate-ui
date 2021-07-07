// babel.config.js

module.exports = function(api) {
  process.env.NODE_ENV === 'development' ? api.cache(false) : api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];
  const plugins = [];
  return {
    presets,
    plugins,
  };
};
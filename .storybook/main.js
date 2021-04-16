const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true            
            }
          }
        }
      ]
    }, 
    // {
    //   test: /.(scss|sass)$/,
    //   loaders: ["style-loader", "css-loader", {
    //     loader: "sass-loader",
    //     options: {
    //       sassOptions: {
    //         indentedSyntax: true,
    //         outputStyle: "compressed",
    //       },
    //     }
    //   }],
    //   include: path.resolve(__dirname, "../")
    // }
    );
    config.resolve.extensions.push(".ts", ".tsx", ".md", ".scss");

    return config;
  },
};
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({
  config
}) => {
  config.module.rules.push({
      test: /\.tsx?$/,
      use: [{
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")]
          }
        },
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
    ,{
        test: /.(scss|sass)$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
    }
    // {
    //   test: /.(scss|sass)$/,
    //   use: {
    //     loader: "sass-loader",
    //     options: {
    //       sourceMap: false,
    //     },
    //   },
    //   include: path.resolve(__dirname, '../src'),
    // },
    // {
    //   test: /\.css$/,
    //   use: [
    //     "style-loader",
    //     {
    //       loader: "css-loader",
    //       options: {
    //         javascriptEnabled: true,
    //         minimize: true,
    //         sourceMap: false
    //       }
    //     },
    //     {
    //       loader: "postcss-loader",
    //       options: { javascriptEnabled: true, sourceMap: false }
    //     }
    //   ],
    // },
  );
  // config.plugins.push(new MiniCssExtractPlugin({
  //   filename: "[name].min.css"
  // }));
  config.resolve.extensions.push(".ts", ".tsx", ".md", ".scss");

  return config;
};
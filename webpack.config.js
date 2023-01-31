const path = require("path");

const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const devMode = process.env.NODE_ENV === "development";

const initFileName = (ext) => {
  let filename = devMode ? "[name]" : "[name].[contenthash]";

  return filename + "." + ext;
};

const generatePathURL = (as) => path.resolve(__dirname, as);

module.exports = {
  entry: generatePathURL("./src/index.tsx"),
  output: {
    filename: initFileName("js"),
    path: generatePathURL("dist"),
  },
  devServer: {
    open: true,
    hot: true,
    port: 4200,
  },
  devtool: devMode && "source-map",
  resolve: {
    extensions: [".jsx", ".js", ".json", ".tsx"],
    alias: {
      "@/assets": generatePathURL("./src/assets"),
      "@/styles": generatePathURL("./src/styles"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: !devMode,
    minimizer: [new HTMLMinimizerPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new HTMLPlugin({
      template: generatePathURL("./src/index.html"),
    }),
    new CleanWebpackPlugin(),
    new CssExtractPlugin({
      filename: initFileName("css"),
    }),

    // analyzer
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css*/,
        use: [CssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ca]ss*/,
        use: [CssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },

      // Babel conf
      {
        test: /\.m?tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
};

import path from "node:path";
// import dotenv from "dotenv"
// import chalk from "chalk";
import {scssLoaderConfig, pugConfigLoader,imageLoaders,fontsLoaders} from "./config_builder/loaders.js";
import {cssMiniCssExtract, pluginGenerateHtml,CopyFiles} from "./config_builder/plugins.js";
import {devSeverConfig} from "./config_builder/devServer.js";
// import {generateEntries} from "./config_builder/optimization.js";

const __dirname = path.resolve();
console.log(process.env.NODE_ENV)

const config = {
  mode: process.env.NODE_ENV || "development",
  entry: {main: path.resolve(__dirname, "src/index.js")},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  module: {
    rules: [scssLoaderConfig, pugConfigLoader,imageLoaders,fontsLoaders]
  },
  plugins: [...pluginGenerateHtml, cssMiniCssExtract,CopyFiles],
  devtool: process.env.NODE_ENV === "production" ? false : "eval-cheap-source-map",
  devServer: devSeverConfig,
};

export default config;
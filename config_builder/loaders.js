import MiniCssExtractPlugin from "mini-css-extract-plugin";

/*-- CSS CONFIG  --*/
export const scssLoaderConfig = {
  test: /\.(c|sc)ss$/,
  use: [
    process.env.NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader'
  ]
};
/*-- END CSS CONFIG  --*/

/*-- PUG-TO-HTML CONFIG  --*/
export const pugConfigLoader = {
  test: /\.pug$/,
  use: [
    {
      loader: "pug-loader",
      options: {
        pretty: true,
      }
    }
  ]
}
/*-- END PUG-TO-HTML CONFIG  --*/

/* IMAGES */
export const imageLoaders = {
  test: /\.(png|jpg|jpeg|gif|svg)$/i,
  type: "asset",
  generator: {
    filename: "images/[name][ext]",
  },
}
/* END IMAGES */

/* IMAGES */
export const fontsLoaders = {
  test: /\.(woff2)$/i,
  type: "asset/resource",
  generator: {
    filename: "fonts/[name][ext]", // Сохраняет шрифты в папку fonts с оригинальным именем
  },
}
/* END IMAGES */
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: [
    "./js/common/comment.js",
    "./js/common/toggle.js",
    // "./js/admin_notice_detail.js",
    // "./js/admin_user_detail.js",
    // "./js/admin.js",
    "./js/app.js",
    "./js/login.js",
    // "./js/notice_add.js",
    // "./js/notice_detail_edit.js",
    // "./js/notice_detail.js",
    "./js/notice.js",
    // "./js/post_detail.js",
    // "./js/posts_add.js",
    // "./js/posts_detail_edit.js",
    // "./js/posts.js",
    // "./js/qa_add.js",
    // "./js/qa_detail_edit.js",
    // "./js/qa_detail.js",
    // "./js/qa.js",
    // "./js/user_add.js",
    // "./js/user_detail_edit.js",
    // "./js/user_detail.js",
    // "./js/user_posts.js",
    // "./js/user.js",
  ],
  // output: {
  //   filename: "bundle.js",
  // },
  // //devtool: 'source-maps',
  // module: {
  //   rules: [
  //     { test: /\.js$/, exclude: /node_modules/ },
  //     {
  //       test: /\.css$/,
  //       use: ["style-loader", "css-loader"],
  //     },
  //     {
  //       test: /\.png$/,
  //       use: [
  //         {
  //           loader: "url-loader",
  //           options: {
  //             mimetype: "image/png",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // devServer: {
  //   contentBase: "src",
  //   hot: true,
  //   open: true,
  //   port: 8000,
  //   watchContentBase: true,
  // },
  plugins: [
    // new webpack.DefinePlugin({
    //   DEV_API_KEY: JSON.stringify("34.64.170.244"),
    //   PRO_API_KEY: JSON.stringify("34.64.85.213"),
    // }),
    //new webpack.EnvironmentPlugin({ API_KEY: "34.64.85.213" }),
    new Dotenv({
      path: "./.env", // .env 파일 경로 (기본값)
      safe: true, // .env.example 로드 (기본값은 dotenv-safe를 사용하지 않는 "false")
    }),
  ],
};

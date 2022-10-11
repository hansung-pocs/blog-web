const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: {
    comment: "./js/common/comment.js",
    toggle: "./js/common/toggle.js",
    admin_notice_detail: "./js/admin_notice_detail.js",
    admin_user_detail: "./js/admin_user_detail.js",
    admin: "./js/admin.js",
    app: "./js/app.js",
    login: "./js/login.js",
    notice_add: "./js/notice_add.js",
    notice_detail_edit: "./js/notice_detail_edit.js",
    notice_detail: "./js/notice_detail.js",
    notice: "./js/notice.js",
    post_detail: "./js/post_detail.js",
    posts_add: "./js/posts_add.js",
    posts_detail_edit: "./js/posts_detail_edit.js",
    posts: "./js/posts.js",
    qa_add: "./js/qa_add.js",
    qa_detail_edit: "./js/qa_detail_edit.js",
    qa_detail: "./js/qa_detail.js",
    qa: "./js/qa.js",
    user_add: "./js/user_add.js",
    user_detail_edit: "./js/user_detail_edit.js",
    user_detail: "./js/user_detail.js",
    user_posts: "./js/user_posts.js",
    user: "./js/user.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_bundle.js",
  },
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

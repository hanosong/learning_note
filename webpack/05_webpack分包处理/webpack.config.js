// 该文件名字最好固定, webpack会自动找到该文件，不然需要单独设置--config=xxx
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  // entry: "./src/index.js",
  // entry: {
  //   index: "./src/index.js",
  //   main: "./src/main.js",
  //   shared: ["axios"], // 会作为name
  // },
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared1",
    },
    main: {
      import: "./src/main.js",
      dependOn: "shared1",
    },
    shared1: ["axios"],
    // shared2: ["dayjs", "redux"],
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./build"), // __dirname -> 全局变量，表示当前路径 -- 当前文件夹下的bundle文件夹
    // placeholder 占位符,动态获取名称
    filename: "[name]-bundle.js", // 打包后文件名
    clean: true,
  },
  resolve: {
    extensions: [".json", ".js", ".wasm", ".jsx", ".ts"], //没写后缀名时， 将自动补全这些进行尝试
  },
  //针对本地服务器的
  devServer: {
    static: ["public"], //将静态资源都放到public文件夹中，打包会一起打进去（可以不写，默认就是public）；可以多个文件夹
    port: 3000, // 启用端口,需要设置1024以上的端口,默认8080
    compress: true, // 压缩打包出来的文件
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "", // 将api开头去掉
        },
        chageOrigin: true, // 修改host地址，为了通过服务器校验（反扒）
      },
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 0个或者1个x
        use: {
          loader: "babel-loader", //会自动找到对应的babel工具--记得安装npm install babel babel-loader -D
        },
      },
      // 针对ts
      {
        test: /\.ts$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};

// stp1: npx babel src --out-dir dist --presets=@babel/preset-env
// stpe2: npx webpack  (webpack也会对文件做转换)

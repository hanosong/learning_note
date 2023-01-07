// 该文件名字最好固定, webpack会自动找到该文件，不然需要单独设置--config=xxx
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./build"), // __dirname -> 全局变量，表示当前路径 -- 当前文件夹下的bundle文件夹
    filename: "bundle.js", // 打包后文件名
    /**
     * 重新打包时，先将之间打包的文件夹删除掉
     */
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,

        use: {
          loader: "babel-loader", //会自动找到对应的babel工具--记得安装npm install babel babel-loader -D

          // options可以抽取到babel.config.js文件中

          // options: {
          //   // plugins: [
          //   //   "@babel/plugin-transform-arrow-functions",
          //   //   "@babel/plugin-transform-block-scoping",
          //   // ],
          //   /**
          //    * 真实开发会使用预设
          //    */
          //   presets: [
          //     "@babel/preset-env", // 写法1
          //     // 写法2：
          //     // [
          //     //   "@babel/preset-env",
          //     //   {
          //     //     targets: ">0.5%", // 给当前的preset-env指定需要设配哪些目标浏览器; target的设置会覆盖.borserslistrc文件的设置
          //     //   },
          //     // ],
          //   ],
          // },
          //
        },
      },
    ],
  },
};

// stp1: npx babel src --out-dir dist --presets=@babel/preset-env
// stpe2: npx webpack  (webpack也会对文件做转换)

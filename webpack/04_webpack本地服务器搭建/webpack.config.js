// 该文件名字最好固定, webpack会自动找到该文件，不然需要单独设置--config=xxx
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./build"), // __dirname -> 全局变量，表示当前路径 -- 当前文件夹下的bundle文件夹
    filename: "bundle.js", // 打包后文件名
    // globalObject: 'this', //解决webpack4在组件使用window报错问题 --- 京北方项目
    /**
     * 重新打包时，先将之前打包的文件夹删除掉
     */
    clean: true,
  },
  resolve: {
    extensions: [".json", ".js", ".wasm", ".jsx", ".ts"], //没写后缀名时， 将自动补全这些进行尝试
  },
  //针对本地服务器的
  devServer: {
    static: ["public"], //将静态资源都放到public文件夹中，打包会一起打进去（可以不写，默认就是public）；可以多个文件夹
  },
  module: {
    rules: [
      // 针对jsx？代码进行babel处理
      {
        test: /\.jsx?$/, // 0个或者1个x
        // exclude:/node_modules/, // babel针对node_modules下面的文件全部不处理
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
      // 针对ts
      {
        test: /\.ts$/,
        // 直接用tsloader无法处理高级语法
        // use: {
        //   loader: "ts-loader",
        // },
        // 解决：使用预设 npm install @babel/preset-typescript -D => 在babel里面配置
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

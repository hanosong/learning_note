// 该文件名字最好固定, webpack会自动找到该文件，不然需要单独设置--config=xxx
const path = require("path");

/**
 * 为什么node和webpack中常用的导入方式是common.js?
 * 因为该代码是基于node运行的，需要使用node可以支持的模块化的方式
 */
module.exports = {
  mode: "production",
  /**
   * 1. false
   * 2. none => production
   * 3. eval => development
   * 4. source-map => production
   *
   * 不常见的：
   * 1.eval-source-map： 添加到eval函数的后面
   * 2.inline-source-map： 添加到文件的后面
   * 3.cheap-source-map(development): 没有生成列映射（第几列第几个字符报错信息不知道）
   * 4.cheap-module-source-map: 对源自于loader的sourcemap处理会更好
   *                        --> 当使用了loader的时候， sourcemap还原的代码会把空格去掉，
   *                            使用module可以把空格等信息还原出来
   * 5.hidden-source-map: 会生成sourcemap文件，但是不会对sourcemap文件进行引用，如果突然想用sourcemap了，可以手动在打包文件后加上 //# sourceMappingURL=bundle.js.map
   * 6.nosources-source-map: 会生成sourcemap文件，只告诉错误信息， 并不会映射还原源代码
   */
  devtool: "source-map",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"), // __dirname -> 全局变量，表示当前路径 -- 当前文件夹下的bundle文件夹
    filename: "bundle.js", // 打包后文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/, //以 .js结尾的，用babel-loader进行处理
        /**
         * npm install babel-loader
         */
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

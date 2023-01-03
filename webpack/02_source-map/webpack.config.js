// 该文件名字最好固定, webpack会自动找到该文件，不然需要单独设置--config=xxx
const path = require("path");

/**
 * 为什么node和webpack中常用的导入方式是common.js?
 * 因为该代码是基于node运行的，需要使用node可以支持的模块化的方式
 */
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"), // __dirname -> 全局变量，表示当前路径 -- 当前文件夹下的bundle文件夹
    filename: "bundle.js", // 打包后文件名
  },
};

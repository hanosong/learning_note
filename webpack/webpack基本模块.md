```js
module.exports = {
  mode: "development", // 开发环境打包
  entry:'./src/main.js', // 入口
  // 出口，打包后输出
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  }
  // 本地服务器， 配置代理proxy...
  devServe: {},
  // 配置路径名，别名
  resolve:{
    extensions: [".ts",".js"],
    alias:{   }
  }
}
```

```js
plugins: [
  new ClearWebpackPlugin(), // 每次打包时清除上次的打包
  // webpack打包时自定义的模板
  new HtmlWebpackPlugin({
    title: "webpack项目",
    template: "./index.html",
  }),
  // 给当前运行的项目动态插入一些值，可以在项目中读取这些值
  new DefinePlugin({
    BASE_URL: "'./'",
    VERSION: "1+1",
    MY_NAME: "HAJUN",
    __VUE_OPTIONS_API__: "true",
    __VUE_PROD_DEVTOOLS__: "false",
  }),
];
```

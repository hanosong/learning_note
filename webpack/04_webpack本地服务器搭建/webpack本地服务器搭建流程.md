## 为什么要搭建本地服务器？

希望当文件发生变化时，可以自动编译和展示

### 如何做到自动编译？

法 1： webpack watch mode
法 2： webpack-dec-serve （常用）
法 3： webpack-dev-middleware （中间件）

```js
// 安装dev-server
npm install webpack-dev-server -D

// 配置脚本命令
"serve": "webpack serve --config hk.config.js" // --config 是当文件名不是webpack.config.js时使用的，后面加的是自定义的文件名

// 启动
npm run serve
```

webpack-dev-serve 在编译之后不会写入到任何输出文件，而是将 bundle 文件保留在内存中
=> 将打包之后的文件放到了内存中
=> 实际上是 webpack-dev-server 使用了一个 memfs 库 （早期使用 memory-fs 库 webpack 自己写的）

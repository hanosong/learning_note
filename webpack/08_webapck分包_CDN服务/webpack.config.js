// 该文件名字最好固定, webpack会自动找到该文件，不然需要单独设置--config=xxx
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./build"), // __dirname -> 全局变量，表示当前路径 -- 当前文件夹下的bundle文件夹
    // placeholder 占位符,动态获取名称
    filename: "[name]-bundle.js", // 打包后文件名,name默认为main
    //单独针对分包的文件进行命名
    chunkFilename: "[name]-chunk.js", // 分出来的一个个小包; name默认为文件路径
    clean: true,
    // publicPath: "CDN地址/",
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
  // 优化配置, production模式下自动开启
  optimization: {
    // 生成的chunkId的算法
    // development -- named(完整名字); production -- deterministic（当别的包发生变化时，id不会发生变化）
    // webpack4: 使用的值为 natural，按照自然数的方式递增，包前面的数字会受到别的包的影响
    chunkIds: "deterministic", // 生成的id
    // runtime的代码是否抽取到单独的包中，vue2脚手架中时单独打包出runtime代码的
    runtimeChunk: {
      name: "runtime",
    },
    // 分包插件：SplitChunksPlugin
    splitChunks: {
      chunks: "all", // 默认值是async，只有异步才分包
      // 当一个包大于指定的大小时，继续进行拆包
      // maxSize: 20000, // 20kb
      // 将包拆分成不小于minSize的包
      // minSize: 10000,
      minSize: 10, // 默认是20000， 至少20kb才会拆包

      // 自己对需要拆包的内容进行分组
      cacheGroups: {
        // key是想要作为的名称
        vendors: {
          // 双斜杠表示完全匹配 /node_modules/
          // windows 上的路劲分隔符 / 和 mac 的相反，=> 所以两个都要匹配
          // \ 有特殊含义-> 转义; 所以要多加一\
          test: /[\\/]node_modules[\\/]/,
          filename: "[name]_vandor.js",
        },
        utils: {
          test: /utils/, // test会自动匹配文件夹
          filename: "[id]_utils.js",
        },
      },
    },
    // 代码优化：TerserPlugin，模式为production时自动配置 => 让代码更加简洁
    minimizer: [
      // JS代码简化
      new TerserPlugin({
        extractComments: false, // 是否提取注释
      }),
      // css代码简化
    ],
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

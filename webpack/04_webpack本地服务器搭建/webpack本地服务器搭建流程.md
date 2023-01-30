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

### hotOnly 配置

> 当代码编译失败时，是否刷新整个页面

- 默认情况： 当代码编译失败时，网页会崩溃，修复后，会重新刷新整个页面
- 如果不希望重新刷新整个页面，可以设置 hotOnly 为 true

### host

> 设置主机地址
> 主机地址默认： localhost
> 如果希望其他地方也可以访问，可以设置为 0.0.0.0

#### loaclhost 和 0.0.0.0 的区别

- localhost：本质上是一个域名，通常情况下会被解析成 127.0.0.1

* 127.0.0.1： 回环地址--表达的是我们主机自己发出的包，直接被自己接收
  正常的数据库包经过 应用层 -> 传输层 -> 网络层 -> 数据链路层 -> 物理层
  回环地址经过 在网络层直接就被获取到了，不会经过 数据链路层 -> 物理层
  我们监听 127.0.0.1 时，在同一个网段下的主机中，通过 ip 地址是不能访问的
* 0.0.0.0 ：监听 IPV4 上所有的地址，在根据端口找到不同的应用程序
  比如我们监听 0.0.0.0 时，在同一个网段下的主机中，通过 ip 地址是可以访问的。

### 其他 api

hotOnly: true 这个 api 现在好像被删除了
host: '0.0.0.0', 可以监听同一个网站下的所有这个地址
prot: 8888, 启用端口,需要设置 1024 以上的端口,默认 8080
open: true,
compress: true, 响应头里面会有 content-encoding: gzip; 浏览器拿到的时 gzip 压缩文件,可以缩小 30%左右 => 对打包之后的代码做压缩

## 开发阶段配置代理

配置 proxy

- 将请求先发送到一个代理服务器，代理服务器和 API 服务器没有跨域问题，就可解决跨域了。

### 代理配置的相关配置属性

1. target: 代理到的目标地址
2. pathRewrite：删除多余的 url
3. chageOrigin：是否更新代理后请求的 headers 中的 host 地址 => 修改 host 地址，为了通过服务器校验（反扒）

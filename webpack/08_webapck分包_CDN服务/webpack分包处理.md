### 什么是 CDN

CDN -- 内容分发网络 Connect Delivery Network

- 通过相互连接的网络系统，利用最靠近每个用户的服务器
- 提供高性能，可扩展性以及低成本的网络内容传递给用户

开发中使用方式：

1. 打包的所有静态资源，放到 CDN 服务器，用户所有资源都是用过 CDN 服务器加载的 -- 需要购买 CDN 服务器，直接修改 publicPath，在打包时添加自己的 CDN 地址
2. 一些第三方资源放到 CDN 服务器上

### 第三方库的 CDN 服务器-免费

国际常用：unpkg，JSDelivr、cdnjs
国内常用：bootcdn

项目中如何引用这些 CDN？
stp1：在打包的时候不需要再对类似 lodash 或者 dayjs 这些库进行打包
stp2：在 html 模式中，我们需要自己加入对应的 CDN 服务器地址

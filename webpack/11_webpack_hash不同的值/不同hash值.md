## hash

在给打包的文件进行命名的时候，会使用 placeholder, 其中有几个属性比较相似

- hash / chunkhash / contenthash
- hash 本身是通过 MD4 的散列函数处理后，生成的一个 128 位的 hash 值（32 个 16 进制）
  --MD4 ： 128 位的内容摘要
  --hash 值改变： 不适合浏览器做缓存，项目中任何一个地方发生改变，都会重新打包

* chunkhash -> 是根据不同的入口进行解析来生成 hash 的
* contenthash 表示生成的文件 hash 名称，只和内容有关，命名发生改变，内容不变，不会改变名称 --- 开发中尽量用

## DDL 库

动态链接库 Dynamic Link Libary ，是软件在 windows 中实现共享函数库的一种实现方式
能够共享，并且不经常改变的代码，抽取成一个共享的库
这个库在之后编译的过程中，会被引入到其他项目的代码中
React 和 Vue 都移除了 DDL
=> webpack4 开始，已经提供了足够的性能，不需要再维护 DDL 了

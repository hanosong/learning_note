#### 3.SplitChunks

> 底层是使用 splitChunkPlugin 实现的
> webapack 已集成，不需要单独安装
> 只需要提供 SplitChunksPlugin 相关的配置信息即可

#### 解决注释的单独提取

在默认情况下，mode: "production", webpack 在进行分包的时候，会对包中的注释进行单独提取到一个 txt 文件

```js
 new TerserPlugin({
        extractComments: false, // 是否提取注释
      }),
```

#### chunkId 的设置

> optimization.chunkIds 配置用于告知 webpack 模块的 id 采用什么算法生成

有三个比较常见的值

1. natural：按照数字的顺序使用 id
2. named： development 下的默认值，一个可读的名称的 id
   deterministic: 确定性的，在不同的编译中不变的短数字 id
   -- webpack4 中使用 natural 代替，但是代码改变，打包前面的数字可能改变

- 开发过程中，推荐使用 named --> 有利于开发人员区分打包是哪个打包的
- 生产环境，deterministic --> 有利于浏览器做缓存相关的工作

### optimization.runtimeChunk 配置

> 现在很多脚手架已经不再配置了

- 配置 runtime 相关的代码是否抽取到一个单独的 chunk 中
  runtime 相关的代码是在运行环境中，对模块进行解析、加载、模块信息相关的代码
  比如 component、bar 两个通过 import 函数相关的代码加载，就是通过 runtime 代码完成的
- 抽离出来后，有利于浏览器缓存的策略：
  比如我们修改了业务代码（main），那么 runtime 和 component、bar 的 chunk 是不需要重新加载的；
  比如我们修改了 component、bar 的代码，那么 main 中的代码时不需要重新加载的

- 设置的值：

1. true/multiple：针对每一个入口打包一个 runtime 文件
2. single：打包一个 runtime 文件
3. 对象： name 属性决定 runtimeChunk 的名称

### Prefetch 和 Preload

> 在文件中设置
> webpack 4.6 新增对预获取和预加载的支持
> 在申明 import 时，可以使用这些内置指令来告知浏览器

1. prefetch: 预获取，将来某些导航下可能需要的资源
2. preload：预加载，当前导航下可能需要的资源

```js
import (
    "./component"
).then(({default: component})) => {}
```

与 prefetch 指令相比，preload 指令有许多不同之处

- preload chunk 会在父 chunk 加载时，以并行方式加载。
  prefetch chunk 会在父 chunk 加载结束后加载
- preload chunk 具有中等优先级，并立即下载。
  prefetch chunk 在浏览器闲置时进行下载
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。
  prefetch chunk 用于未来的某个时刻

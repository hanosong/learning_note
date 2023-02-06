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

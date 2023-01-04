Mode 配置
Mode 配置选项，可以告知 webpack 使用相应的模式的内置优化

- 默认值时 production(什么都不设置的情况下)
- 可选值有：'none'， 'development，' 'production'
  - none： webpack 所有默认配置都不加，只加 webpack.config.js 里面的配置
  - production: （默认），hunk（分包操作）启用确定性的混淆名
  - development：会将 DefinePlugin 中 process.enc.NODE_ENV 的值设置为 Development, 为模块和 chunk（分包操作）启用有效的名

如果是 development 模式，会自动添加以下的配置

```js
devtool: "eval", // 用于设置source-map
```

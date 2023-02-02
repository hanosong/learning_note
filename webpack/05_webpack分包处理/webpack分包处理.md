- 打包之后会生成 index.html 的原因是配置了 HtmlWebpackPlugin

* bunlde.js 中包含了

1. 自己编写的代码
2. 项目中使用的第三方库

- react / react-dom
- axios
- dayjs
- lodash
- ...

3. webpack 为了支持运行时的模块化 -> 运行时代码

=>
所有的东西放到一个包中会导致

1. 不方便管理
2. 首屏渲染速度大大降低， 长时间用户看到的都是一个空白页面 => 1：分包处理（prefetch）2：SSR（还能增加 SEO 优化）

## 性能优化

### 1.代码分离 code splitting

> 将代码分离到不同的 bundle 中，之后可以让用户按需加载，或者并行加载这些文件

- 比如默认情况下， 所有的 js 代码（业务代码，第三方依赖，暂时没有用到的模块）在首页全部都加载，就会影响受屏渲染速度
- 代码分离可以分出更小的 bundle，以及控制资源加载优先级，提供代码的加载性能

#### webpack 中常用的代码分离有三种

1. 入口起点： 使用 entry 配置手动分离代码 => 建立多个入口
2. 防止重复：使用 Empty Dependencies 或者 SpliChunksPlugin 去重和分离代码
3. 通过模块的内联函数调用来分离代码

##### 1. 多入口起点

> 配置多入口 => 使用场景：一个项目想用 vue，一个用 react
> 比如配置一个 index.js 和 main.js 的入口

```js
<script defer src="index-bundle.js"></script>
<script defer src="main-bundle.js"></script>
// index.html里面的defer代表什么

```

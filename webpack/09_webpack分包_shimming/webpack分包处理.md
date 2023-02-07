## shimming

生产一般不用

> shimming 是一个概念,是一类功能的概念
> shimming -> 垫片,相当于给代码填充一些垫片来处理一些问题
> 比如我们现在依赖一个第三方库,这个第三方库本身依赖 lodash,但是默认没有对 lodash 进行导入(认为全局存在 lodash),那么我们就可以通过 ProvidePlugin 来实现 shimming 的效果

- webpack 并不推荐随意的使用 shimming
  webpack 背后的整个理念是使前端开发更加模块化
  也就是说,需要编写具有封闭性的,不存在隐含依赖(比如全局变量)的彼此隔离的模块

### Shimming 预支全局变量

加入一个文件使用了 axios,但是没有对他进行引入

const {ProvidePlugin} = require('webpack')

- ProvidePlugin 能够帮助我们在每个模块中,通过一个变量来获取一个 package
- webpack 如果看到这个模块, 它将在最终的 bundle 中引入这个模块
- ProvidePlugin 是 webpack 内置插件,不需要安装

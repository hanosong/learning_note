# webpack 原理

### 一：webpack 介绍

webpack is a static module bundler for modern javascript applications

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规

则生成对应的静态资源。

webpack 可以让我们在模块化环境下进行模块化开发，开发完成后再将所有模块统一打包成一个文件用以上线。

**什么是 webpack 打包？**
打包 -- bundler

> 模块化 => 把原本写在一个文件中的代码分成很多文件来写.(分)
>
> 打包 => 把写在多个文件中的代码最后合到一起.将代码打包成最终的静态资源(合)

**为什么要打包?**

为了上线。

项目最终需要运行在浏览器环境下，而模块化下的文件有些是无法通过浏览器运行的，例如.less.vue 文件。

因此需要把这些不被浏览器识别的文件转换成浏览器可以识别的文件。

例如，项目中有多个 less 文件，最终会合并成一个 css 文件，多个 vue 组件，也会合并到一个 js 文件中。

自然，多个 js 文件模块，最终也会合并到一个 js 文件中。

**打包命令：**

```
npm run build
```

运行打包命令后，所有 src 中的模块都会被统一打包到一个 dist 文件夹中。如下图：

![1623245555007](.\img\1623245467105.png)

所有的 css 文件，less 文件 sass 文件都会打包到 css 文件夹中，所有的 js 文件和.vue 文件都会打包到 js 文件夹中。

最后这些静态打包的资源，都会通过 index.html 加载到浏览器上。

dependencies 内的源文件一定会被打包。

devDependencies 内的文件是开发中才有用的工具，一定不会被打包。

### 二：webpack 打包前后路径

vue-cli 是基于 webpack 开发的脚手架，可以直接在 vue-cli 中进行打包操作。

项目开发时，经常要写路径，这里的路径需要分清是打包前路径还是打包后的路径。

**注意：**

> 打包前路径：我们开发项目期间是没有打包的，所有的模块文件相对于 src 文件夹写路径，这是打包前路径。
>
> 打包后路径：项目打包后，html 引用资源，是相对于 dist 文件夹写路径的，这是打包后路径。

脚手架自动将大多数打包前路径会转换成打包后路径，但是有些路径不会转换，

1:请求 ajax 时的本地路径不能写打包前的路径。解决办法是把 data.json 放入到 public 文件内。然后写‘./data.json’

2:还例如通过 js 动态加载本地图片路径，不能写打包前路径。需要通过 require 引入图片。require（打包前路径）

另外，项目打包后，脚手架默认把所有的打包前路径转换成在服务器根目录下的路径。这会导致默认运行 dist 内 html 找不到当前文件夹下的 css 文件和 js 文件。如果项目部署上线后是相对于当前文件夹加载资源，需要配置打包后的 publicPath 为 ./

在 vue.config.js 中进行配置

```JavaScript
module.exports = {
  // 打包后所有模块都在dist目录内查找路径
  publicPath: './',
  // 打包后不产生map文件。
  productionSourceMap: false,
}
```

### 三：webpack 配置

vue-cli 实际上是一种 webpack 的模板，它进行了常见的 vue 项目的模块化配置。

例如设置 main.js 为入口文件，app.js 为出口文件，默认下载 vue-loader 等等...

其实每一个项目都可以设置一些独立的 webpack 配置。

不用 vue-cli 也可以自定义 vue 项目的 webpack 配置。

如果每次新建 vue 项目都要书写重复的 webpack 配置，就会变得很麻烦。

因此 Vue 团队才开发了一个 vue-cli 脚手架进行一些常规配置。

如果后续想要定制特殊的 webpack 配置，都统一可以在 vue.config.js 中进行配置。

**webpack 基础配置有 4 项：**

1：配置入口文件 （必须）

2：配置出口文件 （必须）

3：配置 loader （可选）

4：配置 plugin 插件 （可选）

**什么是入口文件？**模块化项目首先编译的项目文件。

通过这个文件，webpack 可以通过“顺藤摸瓜”的方式获取到项目所有的依赖文件。

通过入口文件，webpack 才知道项目需要运行什么模块。

通过入口文件，webpack 才知道项目打包时需要打包什么模块。

**什么是出口文件？**项目需要打包，则需要指定打包后的文件名字以及存放位置。

**什么是 loader （文件提取器）？**

打包的过程中,webpack 需要编译各个模块,但是 webpack 默认只能识别 js 的语法，对于其他格式的代码一律无法编

译，例如 css 语法，vue 语法，less 语法等，为了让打包编译时能识别对应的各种文件，并且把浏览器不能识别的文

件转换成浏览器能识别的文件，需要使用各种 loader 进行文件转换。

例如 less 文件需要转换成 css 文件，.vue 文件需要转换成 js 文件。ES6 语法还需要转换成兼容性更好的 ES5 语法。

loader 就是对应文件的转换工具。

识别 css 文件语法需要 css-loader。

转换 less 文件需要 less-loader。

转换 vue 文件需要 vue-loader。

转换 ES6 语法成 ES5 语法需要 babel-loader。

转换图片为 base64 格式需要 url-loader。

**什么是 plugin 插件？**项目打包过程中可能需要实现某些定制功能。

例如打包 html 文件，这需要配置一个 html-webpack-plugin 插件。

### 四：通过 npm+webpack 配置 Vue 项目（不通过脚手架）

**步骤 1：**

进入 DOS 创建，新建一个文件夹作为项目文件夹。

```
mkdir webpacktest
```

**步骤 2：**

进入 webpacktest，初始化项目

```
npm init -y
```

初始化完成后，项目文件夹中会多出一个 package.json 文件。

此时你可以通过 npm install xxx 文件命令安装依赖。

**步骤 3：**

安装 webpack 和 webpack-cli，用于实现打包。

```
npm i webpack -g
npm i webpack-cli -g
```

安装完成后，就可以通过 webpack 命令打包

```
webpack
```

> webpack 不做任何设置，默认的入口文件就是 src 文件夹中的**index.js**
>
> webpack 默认的出口文件在 dist 文件夹中的**main.js**

**步骤 4：**

如果需要修改 webpack 默认的出口和入口文件，需要新建一个 webpack.config.js 文件。

在 webpack.config.js 文件中就可以进行 webpack 的 4 项配置，即入口，出口，loader 以及 plugin

如果项目目录下有 webpack.config.js 文件，则 webpack 会优先读取这个文件。

```javascript
// webpack.config.js

// 引入路径模块
const path = require("path");

module.exports = {
  mode: "development", // 当前这一次打包的模式，在开发环境打包
  // 入口文件
  entry: "./src/main.js",
  // 出口文件
  output: {
    // 出口文件打包地址
    path: path.resolve(__dirname, "./dist"),
    // 出口文件名
    filename: "app.js",
  },
};
```

**步骤 5:**

配置好入口文件出口文件后，我们的项目必须打包后才可以查看效果和调试，非常不方便。

因此需要为项目配置一个本地服务器 webpack-dev-server 用于热更新调试项目，从而避免需要打包才能调试。

注意：安装 webpack-dev-server 需要先 webpack-cli，但是这两个工具的最新版有冲突，只能安装指定的

webpack-cli 版本才可以，亲测 3.3.12 版本的 webpack-cli 不和 webpack-dev-server 冲突。

```
npm i webpack-cli@3.3.12 -g
npm i webpack-dev-server -g
```

然后通过 webpack-dev-server 命令可以运行本地服务器。

此时可以通过修改 package.json 中的 scripts 选项来添加一个命令来运行 webpack-dev-server。

```json
 "scripts": {
    "server": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

此时，项目运行在了指定的服务器中，但是，对项目的修改不能实时的在浏览器中查看到变化。

启动服务器的热更新之后，每次项目修改，都会在内存中临时打包，通过 html 渲染到页面上。

需要在 webpack.config.js 中进行 devServer 的配置。

```
  devServer: {
  	// 在内存中实时打包,用以检查新的变化.
    publicPath: '/dist'
  }
```

**步骤 6：**

此时我们可以在模块中书写 Vue 的语法。

但是需要安装对应的 vue-loader，以及编译 Vue 组件模板的编译器 vue-template-compiler

另外，在使用 vue-loader 前，需要显式的引入一个 vue-loader 中的插件。

loader 和插件需要在 webpack-config.js 中进行配置。

安装对应的 loader 和工具.

```
npm i vue-loader -D
npm i vue-template-compiler -D
```

配置 webpack.config.js

```javascript
// 显式引入一个VueLoader插件。注意,下载loader时已经包含这个插件了,不需要额外安装.
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	...
    // 在module中配置loader
	 module: {
        rules: [{
          test: /\.vue$/,
          use: [
            'vue-loader'
          ]
        }]
  	},
    // 在plugins中配置插件.
  	plugins:[
  		new VueLoaderPlugin(),
  	]
}
```

**步骤 7:**

此时我们已经可以运行对应的 vue 项目.但是 css 的文件的引入还是会编译报错.

以及引入的图片无法显示还有打包时不包含 html 文件等问题。

因此需要引入对应的 loader 以及其他插件来完成对应的问题。

安装对应的 loader

```
npm i css-loader -D
npm i style-loader -D
npm i url-loader -D
npm i file-loader -D
npm i uglistjs-webpack-plugin -D
npm i html-webpack-plugin -D
```

其中,css-loader 是为了编译 css 文件

style-loader 是为了把编译好的 css 文件通过 link 标签插入到 head 中使样式生效.

**注意：use 数组中，style-loader 必须写在 css-loader 的前面。**

url-loader 为了处理图片的路径以及转换为 base64 等问题。url-loader 依赖 file-loader。

uglistjs-webpack-plugin 插件可以让我们打包后的文件没有注释和换行，以减少打包体积。

html-webpack-plugin 可以让我们打包 html 文件。

配置 webpack.config.js

```JavaScript
module.exports = {
	...
    // 在module中配置loader
	 module: {
        rules: [{
           test: /\.css$/,
           use: [
           	'style-loader',
           	'css-loader',
           ]
        },{
          test: /\.(png|jpg|jpeg|gif||svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              // 限制开始转译的大小，小的图片则不用转译，减少HTTP请求.单位是字节
              limit: 20000,
              // 导入的图片后不需要加default。
              esModule: false,
              // 自定义转译的文件名称
              // ext表示文件的扩展名
              // 取hash值前7位。
              name: '[name]-[hash:7].[ext]'
            }
      	  }],
    	}]
  	},
    // 在plugins中配置插件.
  	plugins:[
        new HtmlWebpackPlugin({
      		template: './index.html'
    	}),
    	new UgLifyJSPlugin(),
  		new VueLoaderPlugin(),
  	]
}
```

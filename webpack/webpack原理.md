# webpack原理



### 一：webpack介绍

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规

则生成对应的静态资源。

webpack可以让我们在模块化环境下进行模块化开发，开发完成后再将所有模块统一打包成一个文件用以上线。



**什么是webpack打包？**

>模块化 => 把原本写在一个文件中的代码分成很多文件来写.(分)
>
>打包 => 把写在多个文件中的代码最后合到一起.(合)



**为什么要打包?**

为了上线。

项目最终需要运行在浏览器环境下，而模块化下的文件有些是无法通过浏览器运行的，例如.less.vue文件。

因此需要把这些不被浏览器识别的文件转换成浏览器可以识别的文件。

例如，项目中有多个less文件，最终会合并成一个css文件，多个vue组件，也会合并到一个js文件中。

自然，多个js文件模块，最终也会合并到一个js文件中。



**打包命令：**

```
npm run build
```

运行打包命令后，所有src中的模块都会被统一打包到一个dist文件夹中。如下图：

![1623245555007](.\img\1623245467105.png)

所有的css文件，less文件sass文件都会打包到css文件夹中，所有的js文件和.vue文件都会打包到js文件夹中。

最后这些静态打包的资源，都会通过index.html加载到浏览器上。

dependencies 内的源文件一定会被打包。

devDependencies 内的文件是开发中才有用的工具，一定不会被打包。



### 二：webpack打包前后路径

vue-cli是基于webpack开发的脚手架，可以直接在vue-cli中进行打包操作。

项目开发时，经常要写路径，这里的路径需要分清是打包前路径还是打包后的路径。

**注意：**

>
>
>打包前路径：我们开发项目期间是没有打包的，所有的模块文件相对于src文件夹写路径，这是打包前路径。
>
>打包后路径：项目打包后，html引用资源，是相对于dist文件夹写路径的，这是打包后路径。
>
>

脚手架自动将大多数打包前路径会转换成打包后路径，但是有些路径不会转换，

1:请求ajax时的本地路径不能写打包前的路径。解决办法是把data.json放入到public文件内。然后写‘./data.json’

2:还例如通过js动态加载本地图片路径，不能写打包前路径。需要通过require引入图片。require（打包前路径）



另外，项目打包后，脚手架默认把所有的打包前路径转换成在服务器根目录下的路径。这会导致默认运行dist内html找不到当前文件夹下的css文件和js文件。如果项目部署上线后是相对于当前文件夹加载资源，需要配置打包后的publicPath为 ./ 

在vue.config.js中进行配置

```JavaScript
module.exports = {
  // 打包后所有模块都在dist目录内查找路径
  publicPath: './',
  // 打包后不产生map文件。
  productionSourceMap: false,
}
```



### 三：webpack配置

vue-cli实际上是一种webpack的模板，它进行了常见的vue项目的模块化配置。

例如设置main.js为入口文件，app.js为出口文件，默认下载vue-loader等等...

其实每一个项目都可以设置一些独立的webpack配置。

不用vue-cli也可以自定义vue项目的webpack配置。

如果每次新建vue项目都要书写重复的webpack配置，就会变得很麻烦。

因此Vue团队才开发了一个vue-cli脚手架进行一些常规配置。

如果后续想要定制特殊的webpack配置，都统一可以在vue.config.js中进行配置。



**webpack基础配置有4项：**

1：配置入口文件 （必须）

2：配置出口文件 （必须）

3：配置loader （可选）

4：配置plugin插件 （可选）



**什么是入口文件？**模块化项目首先编译的项目文件。

通过这个文件，webpack可以通过“顺藤摸瓜”的方式获取到项目所有的依赖文件。

通过入口文件，webpack才知道项目需要运行什么模块。

通过入口文件，webpack才知道项目打包时需要打包什么模块。



**什么是出口文件？**项目需要打包，则需要指定打包后的文件名字以及存放位置。



**什么是loader （文件提取器）？**

打包的过程中,webpack需要编译各个模块,但是webpack默认只能识别 js 的语法，对于其他格式的代码一律无法编

译，例如css语法，vue语法，less语法等，为了让打包编译时能识别对应的各种文件，并且把浏览器不能识别的文

件转换成浏览器能识别的文件，需要使用各种loader进行文件转换。

例如less文件需要转换成css文件，.vue文件需要转换成js文件。ES6语法还需要转换成兼容性更好的ES5语法。

loader就是对应文件的转换工具。

识别css文件语法需要css-loader。

转换less文件需要less-loader。

转换vue文件需要vue-loader。

转换ES6语法成ES5语法需要babel-loader。

转换图片为base64格式需要url-loader。



**什么是plugin插件？**项目打包过程中可能需要实现某些定制功能。

例如打包html文件，这需要配置一个html-webpack-plugin插件。



### 四：通过npm+webpack配置Vue项目（不通过脚手架）



**步骤1：**

进入DOS创建，新建一个文件夹作为项目文件夹。

```
mkdir webpacktest
```



**步骤2：**

进入webpacktest，初始化项目

```
npm init -y
```

初始化完成后，项目文件夹中会多出一个package.json文件。

此时你可以通过npm install xxx文件命令安装依赖。



**步骤3：**

安装webpack和webpack-cli，用于实现打包。

```
npm i webpack -g
npm i webpack-cli -g
```

安装完成后，就可以通过webpack命令打包

```
webpack
```

>
>
>webpack不做任何设置，默认的入口文件就是src文件夹中的**index.js**
>
>webpack默认的出口文件在dist文件夹中的**main.js**
>
>



**步骤4：**

如果需要修改webpack默认的出口和入口文件，需要新建一个webpack.config.js文件。

在webpack.config.js文件中就可以进行webpack的4项配置，即入口，出口，loader以及plugin

如果项目目录下有webpack.config.js文件，则webpack会优先读取这个文件。

```javascript
// webpack.config.js

// 引入路径模块
const path = require('path');

module.exports = {
  // 入口文件
  entry: './src/main.js',
  // 出口文件
  output: {
    // 出口文件打包地址
    path: path.resolve(__dirname, './dist'),
    // 出口文件名
    filename: 'app.js'
  }
}
```



**步骤5:**

配置好入口文件出口文件后，我们的项目必须打包后才可以查看效果和调试，非常不方便。

因此需要为项目配置一个本地服务器webpack-dev-server用于热更新调试项目，从而避免需要打包才能调试。

注意：安装webpack-dev-server 需要先 webpack-cli，但是这两个工具的最新版有冲突，只能安装指定的

webpack-cli版本才可以，亲测3.3.12版本的webpack-cli不和webpack-dev-server冲突。

```
npm i webpack-cli@3.3.12 -g
npm i webpack-dev-server -g
```

然后通过webpack-dev-server命令可以运行本地服务器。

此时可以通过修改package.json中的scripts选项来添加一个命令来运行webpack-dev-server。

```json
 "scripts": {
    "server": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

此时，项目运行在了指定的服务器中，但是，对项目的修改不能实时的在浏览器中查看到变化。

启动服务器的热更新之后，每次项目修改，都会在内存中临时打包，通过html渲染到页面上。

需要在webpack.config.js中进行devServer的配置。

```
  devServer: {
  	// 在内存中实时打包,用以检查新的变化.
    publicPath: '/dist'
  }
```



**步骤6：**

此时我们可以在模块中书写Vue的语法。

但是需要安装对应的vue-loader，以及编译Vue组件模板的编译器vue-template-compiler

另外，在使用vue-loader前，需要显式的引入一个vue-loader中的插件。

loader和插件需要在webpack-config.js中进行配置。

安装对应的loader和工具.

```
npm i vue-loader -D
npm i vue-template-compiler -D
```

配置webpack.config.js

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



**步骤7:**

此时我们已经可以运行对应的vue项目.但是css的文件的引入还是会编译报错.

以及引入的图片无法显示还有打包时不包含html文件等问题。

因此需要引入对应的loader以及其他插件来完成对应的问题。

安装对应的loader

```
npm i css-loader -D
npm i style-loader -D
npm i url-loader -D
npm i file-loader -D
npm i uglistjs-webpack-plugin -D
npm i html-webpack-plugin -D
```

其中,css-loader是为了编译css文件

style-loader是为了把编译好的css文件通过link标签插入到head中使样式生效.

**注意：use数组中，style-loader必须写在css-loader的前面。**

url-loader为了处理图片的路径以及转换为base64等问题。url-loader依赖file-loader。

uglistjs-webpack-plugin插件可以让我们打包后的文件没有注释和换行，以减少打包体积。

html-webpack-plugin可以让我们打包html文件。

配置webpack.config.js

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







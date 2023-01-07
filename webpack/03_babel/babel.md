## babel

### 在命令行中使用 babel 工具？

1. npm install @babel/core @babel/cli -D
2. npx babel --version
   - 为什么使用 npx？
   - 因为需要使用 node_modules 下面的 bin 里面的 babel
3. npx babel ./src --out-dir ./build 会把文件夹中的所有文件进行转换,--out 输出到 build 文件夹里
4. 默认是不会进行转化的，必须使用插件（plugins）,必须单独安装插件

   - npm install @babel/plugin-transform-block-scoping // 把有块级作用域的转为没有块级作用域的
   - npm install @babel/plugin-transform-arrow-functions -D //转化箭头函数
   - npx babel ./src --out-dir ./build --plugins=@babel/plugin-transform-block-scoping,@babel/plugin-transform-arrow-functions

   使用多个 plugin 时，用逗号隔开

### 每次转换不同的类型，都要安装不同的插件，有没有解决方式？ => Babel 的预设 preset

使用方式

1. npm install @babel/preset-env -D
2. npx babel ./src --out-dir ./build --presets=@babel/preset-env
   - 会根据要适配的浏览器以及涉及到浏览器的兼容性问题进行转换
   - 默认会开启严格模式

### Babel 的底层原理

本质：编译器

#### 工作流程

1. 解析 parsing
   词法分析 lexical analysis -> tokens 数组 -> 语法分析 parsing ->
2. 转换 transformation
   转成 AST 抽象语法树 -> 通过 plugin -> 转成新的 AST 语法树
3. 生成 code generation

### babel-preset

> webpack 会根据我们的预设来加载对应的插件列表，并将其传递给 babel
> npm install @babel/preset-env
> 常见的预设

1. env
2. react
3. TypeScript

## 浏览器兼容性

> 不管时 chrome 浏览器还是 edge 浏览器，使用的内核都是 Blink -- 浏览器大一统时代要到了

#### 关于兼容性

> 考虑兼容性的问题， 实质就是考虑浏览器市场占有率的问题
> 查询市场占有率的网站 -- caniuse.com

- css 兼容性： postcss --> 将比较新的 css 特性/浏览器前缀 => 自动转换
- js 兼容性： babel

### browserslist

> 在不同的前端工具之间，共享目标浏览器和 Node.js 版本的配置
> 底层用到了 caniuse-lite 工具，数据来自 caniuse 网站

- dead： 24 个月内都没有官方更新和维护

#### Browserslist 编写规则

> 仅了解

1. defaults： Browserslist 的默认浏览器（ > 0.5%, last 2 version, Firefox ESR, not dead）
2. 5%： 通过全局使用情况统计信息选择的浏览器版本
3. dead
4. last 2 version： 每个浏览器的最后两个版本

#### 命令行使用 browserslist

安装 babel 的时候， 会附带安装 browserslist

```js
    // 查询默认兼容的浏览器
    npx browserslist

    // 查询自定义兼容的浏览器版本， 逗号表示或的条件
    npx browserslist ">1%, last 2 version, not dead"

    // 编写规则， 并使其对特定的工具生效
    /*
    方案1： 放在package.json中配置
        'browserslist': [
            "last 2 version",
            "not dead",
            "> 0.2%"，
        ]
    方案2： 单独的一个配置文件 .browserslistrc文件
        开发中常用2：因为browserslist工具， 可以在多个前端工具之间进行共享浏览器兼容设置（postcss/babel都可以用broserslistrc中的设置）
    */
    // 设置package.json => 使打包 npm run build

```

#### 多个条件之间的关系

- 或： or / , / 换行
- 且： and
- 非： not --> > .5% and not last 2 version

### Baebl 的配置文件

> 将 babel 的配置信息放到一个独立的文件中

- babel.config.json(或者 js / cjs / mjs) cjs -> common js ;
  - babel7 使用，可以直接作用于 Monorepos 项目的子包
- .babelrc.json(或者.babelrc / js / cjs / mjs)
  - 早期使用较多的配置方式，但是对于配置 Monorepos 项目比较麻烦

> Monorepos -> 一种项目的管理方式：
> 比如： babel： => 包含 core / preset-env / arrow-function / cli...很多包
> Monorepos -> 第三方框架项目 就是一个项目有很多子包：

    core ---package.json
    preset-env   --- package.json
    ...

## polyfill

> 更好的使用 js
> 一些特殊的语法

- 特殊的语法：promise -> polyfill 中有自己定义的 function promise
- 特殊的 API string.includes() -> String.prototype.includes

### polyfill 的安装

1. babel 7.4.0 之前

   - npm install @babel/polyfill --save

2. 单独引入 core-js 和 regenerator-runtime

#### useBuiltIns 属性

有三个常见值

1. false -- 不使用 polyfill 来进行适配，并且这个时候无需设置 corejs
2. 'useage'： 自动检测所需要的 polyfill
3. 'entry': axois,loadash,这些第三方包如果也需要依赖于 polyfill 时使用。这样做会根据 browserlist 目标导入所有的 polyfill -> 包体积变大（尽量使用 useage）
   - 还需要在入口的代码中引入 import 'core-js/stable'
   - import 'regenerator-runtime/runtime'

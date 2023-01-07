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

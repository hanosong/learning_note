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

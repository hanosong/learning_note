##### 2. 动态导入 dynamic import

webpack 提供了两种动态导入的方式

1. 使用 ECMAScript 中的 import()语法
2. 遗留的 require.ensure 方式

> 目的：希望在代码运行过程中来加载它， 比如条件成立时

路由的实现：
哈希路由 - 修改哈希值 ： location.hash
历史路由 ： history.push

- import 函数
  如果导出的方式时 default
  则想要拿到导入的结果： import('url').then(res => res.default())
  如果导出的方式是普通导出，直接 res.方法名即可

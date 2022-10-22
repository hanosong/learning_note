#### 问题 1:

由于 vue2 把 响应式数据都写在 data 里, 方法都写在 methods
当数据和方法很庞大的时候, 维护起来很困难, 对于数据对应的方法是哪个, 很难确定

解决方式: 使用 mixins => 是一个数组

```js
const mix1 = { data: () => ({ mix1的数据 }), methods: { mix1的方法 } };
const mix2 = { data: () => ({ mix2的数据 }), methods: { mix2的方法 } };

//在组件中使用
mixins: [mix1, mix2];
```

#### 问题 2:

由于 vue 在书写时, 使用 template + js + css,
如果事件多了, 代码很容易变得臃肿
查看代码的时候,需要鼠标滚轮不停上下滚动

解决方式:

1. 每页代码控制在 200 行左右, 如果超过了, 就封装到另一个组件里

2. css 书写的时候, 可以使用 tailwindcss 插件,不需要编写基础的 CSS 样式规则，只需要直接在 HTML 中应用已经事先定义好的类名。

```js
//Tailwind 允许我们在单个 CSS 文件中使用它们的类名：
.header {
     @apply bg-red-200 w-4 text-gray-400 rounded-sm border-2;
     }
```

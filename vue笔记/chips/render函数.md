### render 函数

1. render 函数的作用
   -1:用来代替 template 选项
   -2:用 render 函数来书写组件视图

2. render 函数和 template 比较
   -1:Vue 实例化的过程中,Vue 会把字符串的 tmplate 视图编译成虚拟节点 => 耗时耗性能
   -2:render 函数不需要进行字符串 template 的编译过程 => 省时
   -3:render 函数可以直接提供与视图对应的虚拟节点 => 但是不直观

#### render 函数写视图举例

```js
//如果用template视图
template:`
<duv id="app" class="active">
    hahaha
</div>
`,
//render函数改写
const App = {
  render(h) {
    return h("div", {
      attrs: {
        id: "app",
        class: "active",
      },
      ['hahaha']
    });
  },
};

//根组件也改写
new Vue({
    render:h => h(App)
}).$mount('#app')
```

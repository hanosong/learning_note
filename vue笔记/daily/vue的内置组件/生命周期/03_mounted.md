### 1. 视图挂载

1. 视图挂载的步骤
   -1: 先把组件视图转换为虚拟节点.
   -2: 通过虚拟节点转换为真实的节点 => 把旧视图变成有响应式功能的视图
   -3: 把这个通过虚拟节点生成的真实节点, 替换#app => 视图挂载

=> 视图挂载前后的标签节点,已经不是同一个了

### 2. created 和 mounted 的区别

1. created 触发时,视图还没有挂载.
2. 在 created 中,不能操作视图节点
3. 在旧视图中使用 ref='h3' ,在 mounted 中能够通过 this.$refs.h3.style.backgroundColor 修改其样式, created 函数中不行

### 3.把 axios 请求写在 mounted 中

```js
//假设有一个请求接口的函数
mounted(){
   getSenssorDate()
   .then(res => {
      console.log(res)
   })
}

```

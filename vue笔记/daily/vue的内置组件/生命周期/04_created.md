### created

1. 如果想让 created 操作视图 => 使用 nextTick

```js
//在created中操作视图
created() {
// created中通过nextTick来操作视图.
// 实例化过程中,组件视图挂载,也会默认触发一次nextTick.
this.$nextTick(() => {
    this.$refs.h3.style.backgroundColor = 'red';
});
}
```

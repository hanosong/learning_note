### updated 和 watch

1. updated => 视图更新后触发 => 因为那个数据变化导致触发? we not know

2. watch => 监听的数据变化时触发

### 如果只监听某个数据的变化,其余数据变化均不做出任何反应,怎么办? nextTick

=> updated 无法得知本次视图更新时因为什么数据变化导致的 => 不能使用它

=> 使用 nexTick: 单词触发的 updated,本次视图更新后触发(不用 updated 钩子函数)

```js
//点击后触发事件fn
fn() {
    // 修改了msg.msg会导致视图更新.
    this.msg = Math.random();

    // 这个nextTick就自动在msg导致的视图更新后触发.
    this.$nextTick(() => {
    console.log(this.$refs.h3.innerText);
    });
}
```

### nextTick

1. 用途 : 用来处理视图更新后的视图问题

```js
//留言板贴地
const App = {
  template: `
        <div>
          <button @click='show'>按钮</button>
          <ul ref='ul'>
            <li v-for='d in num'>{{d}}</li>
          </ul>
        </div>
      `,
  data: () => ({ num: 1 }),
  methods: {
    show() {
      // num变化.
      this.num += 1;
      // 每次num变化,都判断是否需要设置触底.
      this.$nextTick(() => {
        const oUl = this.$refs.ul;
        if (oUl.scrollHeight >= oUl.clientHeight) {
          oUl.scrollTop = oUl.scrollHeight - oUl.clientHeight;
        }
      });
    },
  },
  // updated() {
  //   const oUl = this.$refs.ul;
  //   if (oUl.scrollHeight >= oUl.clientHeight) {
  //     oUl.scrollTop = oUl.scrollHeight - oUl.clientHeight;
  //   }
  // }
};
```

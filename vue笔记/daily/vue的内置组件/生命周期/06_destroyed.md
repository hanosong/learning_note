### destoryed

1. 组件销毁 => 组件被销毁, 意味着组件的视图不再具备响应式 => 添加的自定义事件也会被自动解绑

2. 如何主动销毁组件? => $destory()

3. 当组件被销毁的时候,会触发destoryed()钩子函数

```js
const box = {
      template: `
        <div>
          <h3>box组件---{{msg}}</h3>
          <button @click='show'>触发自定义事件</button>
          <button @click='fn'>销毁组件</button>
        </div>
      `,
      methods: {
        show() {
          // 触发自定义事件
          this.$emit('myevent');
        },
        fn() {
          // 主动销毁组件的一个方法.
          this.$destroy();
        }
      },
      data: () => ({msg: 0}),
      // 组件销毁后触发.
      destroyed() {
        console.log('box被销毁触发');
        // 组件销毁后,需要清楚定时器。
        clearInterval(this.id);
        // 手动解绑事件
        this.$off('myevent');
      },
      created() {
        console.log('box被重新创建');
        // 开启定时器,周期修改组件数据.
        this.id = setInterval(() => {
          console.log('定时器触发')
          this.msg += 1;
        }, 1000);
        // 默认添加事件
        this.$on('myevent', () => {
          console.log('myevent事件触发');
        })
      }
    }

    const App = {
      template: `
        <div>
          <h3>App组件</h3>
          <button @click='fn'>按钮</button>
          <box v-if='flag' />
        </div>
      `,
      components: { box },
      data() {
        return { flag: true }
      },
      methods: {
        fn() {
          this.flag = !this.flag;
        }
      }
    }

    new Vue({
      render: h => h(App),
    }).$mount('#app');
```
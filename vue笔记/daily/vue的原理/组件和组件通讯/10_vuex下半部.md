### 如何处理 state 的异步修改的问题?

1. 使用 actions 的数据流 => 处理 state 的异步修改问题

2. actions 的数据流(vuex 从数据变化到视图更新的大概流程)
   -1:组件触发
   -2:actions(dispatch)
   -3:mutations(commit)
   -4:state 数据更新
   -5:更新对应组件视图

```js
const store = new Vuex.Store({
  actions: {
    //actions内,包含有异步操作
    //异步完成,让actions触发mutations内的方法 => 达到异步修改state的目的

    asyncSetMsg(store) {
      setTimeout(() => {
        store.commit("setMsg");
      }, 1000);
    },
  },
});
```

### getters

1. getters 是什么? => Vuex 的计算属性,以 state 中的数据作为依赖计算出别的值时,使用 getters

```js
//计算总价
getters:{
  total(state){
    //count和price在state中定义,使用methods里面的mutations修改state的数据
    return state.count * state.price
  }
}
```

#### 严格模式 在 vuex 实例里面=> strict:true

1. 特性: 不能在 mutations 的方法之外的地方修改 state 数据

### 如何把 vux 中的公共方法中放在一起呢?

1. mixins: 组合混合 => 封装一些相同的选项
2. 语法和书写步骤:
   -1:先解构出 mx 需要的对象
   -2:在组件中引入 mixins

3. 特殊注意事项: 当 mixins 内的选项和组件的选项冲突时,以组件的选项为准

```js
//需要映射什么,就解构什么
const { mapState, mapMutations, mapActions, mapGetters } = Vuex;

//创建
const mx = {
  //state里面的数据
  computed:{
      //将state里面的变量变成组件的变量
      //如果组件里面的变量名字和state数据里面的名字不一样
      ...mapState({abc:'count'})
      //如果组件里面的变量名字和state数据里面的名字一样
      ...mapState(['count'])
  }
}

//如何使用mx?
//在组件中使用mixins属性, 属性值为[mx]
mixins: [mx]

```

### Vuex 的响应式

1. mutations 的局限性: 在 mutations 里面,由于不能用 this,所以 data 数据获取不到
2. mutations 中的方法和组件的方法在修改数组数据的方式上一致 =>
   直接修改数组的元素, 视图是不更新的

3. 如何触发 mutations 里面的方法?
   -1:通过$store.commit 触发
   -2:还可以给该方法传递参数,参数可以是变量(多个变量用数组[括起来]),参数还可以是对象
   -3: 可以触发一个函数,在这个函数内部再触发 mutations 里面的函数

```js
//在某个组件中
  <button @click="fn">按钮</button>
//在该组件的methods中
  fn(){
    this.$store.commit('mutions里面的那个函数名', [1,2])
  }
```

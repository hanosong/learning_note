### 什么是组件状态?

1. 组件状态
   => 响应式数据和它所对应的视图
   => 可以理解为: 状态就是组件的响应式数据

2. 为什么组件的 data 必须是函数
   =>组件复用的过程中,状态应该是互相独立的
   =>必须在组件复用的过程中,返回不同的 data 对象
   =>如果不是函数,那么相当于在全局 const obj = {msg: 100}

### 什么是状态管理?

1. 状态管理的定义
   => 多个组件共用一个状态
   1: 多个组件使用同一个数据
   2: 这个数据变化了,所有使用了该数据的组件视图同时更新

2. 状态管理的分类
   1: 局部状态管理 => 若干个组件公用同一个状态 => 单向数据流
   2: 全局状态管理 => 所有组件共用一个状态

### 单向数据流如何实现状态管理?

1. 目的: 通过父传子,利用单向数据流,实现最简单的状态管理
2. 应用场景: 组件嵌套层级比较少的情况
3. 局部状态管理步骤:
   1: 唯一的数据放在父组件上
   2: 修改这个数据的方法也写在父组件的方法上
   3: 子组件通过触发自定义事件,触发父组件的这个方法 => 修改大家共用的状态
   4: 多个子组件时,在父组件上都添加一遍这个方法
   多个子组件共用的数据,声明在父组件的 data 里,通过 props 把它传到子组件里使用

4. 实现原理:
   1: 父组件数据变化 => 父组件视图更新 =>指令重新执行 =>传递新的数据给子组件
   2: 父组件视图更新导致了子组件视图更新(单向数据流的现象)

#### 组件挂载的地方,可以写什么指令?

1. 可以写的指令 => v-for,v-bind,v-if,v-on
2. @click='' => 这里面可以直接写一个表达式,获取到的是这个表达式的返回值 => 在子组件可以直接触发父组件的自定义事件: @click="$emit('myevent',val)"
3. 当 v-on 绑定原生事件时,需要添加.native 修饰符=>@click.nativ='fn'
   =>应用场景:比如直接点击某个 div,这是无法触发点击事件的,需要添加.native 修饰符,把该组件变成普通的原生 html 标签,可以使用 keydown 等原生 html 事件

### Vuex 是什么?

1.  Vuex 是什么? => vuex 是 vue 的插件,应该先引入 vue,再引入 vuex
2.  Vuex 的作用是什么? => 进行全局状态管理

3.  Vuex 关心的问题
    1: 怎么实例化数据仓库 store => const store = new Vue.Store({ state,mutations,actions,getters,modules })

               -a:如何挂载 => 挂到 Vue 实例里面

          2: 怎么获取数据

              -a:组件中的数据怎么放到store里面(第三点) => 组件中触发方法fn(){ this.$commit.mutations('方法名',实参)} =>在store内的mutations里面通过对应的方法修改数据 => state.msg = val
              -b:组件怎么从store中拿数据=> 通过$store属性访问store内的数据和方法 =>this.$store.state.message

          3: 怎么修改数据
          4: 怎么映射?

          ```js
          //!!!普通做法1:
           -stp0: 需要先按需解构const { mapState, mapMutations, mapActions, mapGetters } = Vuex;
           -stp1:const mx = {
              computed:{
              ...mapState({abc:'count'}) => 名字一样可以简写: ...mapState({'count'})
              },
              methods:{
                  //变成组件的方法,组件可以直接触发.
                  ...mapMutations(['setMsg']),
                  ...mapActions(['asyncSetMsg']),
              }
           -stp2:在需要使用mx的组件中导入  => mixins:[mx]
          }

          //!!!工程上的做法
              -step1:把store放在store文件夹中的index.js文件中
                //先导入,在use一下
                import Vue from "vue";
                import Vuex from 'vuex';
                Vue.use(Vuex);
                //导出实例
                export default new Vuex.Store({ state,mutations,actions,getters,modules })
              -step2: 在需要使用mx的组件中导入vuex
                  //使用vuex里面的方法,按需引入
                  import { mapMutations, mapState} from 'vuex'
                  //要使用state中的数据,在computed中映射出来
                  computed:{
                    ...mapState(['userInfo','asyncRoutes'])
                    },
                  //要使用mutations中的方法,在methods中映射出来
                  methods:{
                    ...mapMutations(['saveUserInfo', 'saveToken']),
                  }

          ```

          什么是映射? => 将 store 中的数据和方法映射为组件的数据和方法

#### 1.Vuex 的实例化

```js
1. 需要在全局实例化一个vuex
const store = new Vuex.Store({
    state:{
        msg:0,
        //这里写的数据是多个组件共用的状态数据
        //这个数据变化  =>  所有组建视图都会更新

        //组件中如何使用这里的数据?
        //1.组件的computed对象(计算属性)中,将state里面的变量return出来=>this.$store.state.变量名

        //2.组件的视图如何挂载? => {{$store.state.变量名}}
    }

    mutations:{
        //需要修改state数据时,将methods写在这里面
        //假如要修改msg
        //参数二:
        //可以传入一个对象
        //可以传入多个实参,写成数组的形式
        setMsg(state, [val,val2]){
            //当要使用state里面的数据时,不能用this
            //需要用state.msg
        }// => 怎么触发这个函数?
    }
})

//假设有一个组件box
const box = {
    template:`
    <div>
        <h3>{{$store.state.msg}}</h3>  // 视图上使用state里面的数据
        <button @click='$store.commit("setMsg",["幂幂","超越"])'>按钮</button>
    </div>
    `,
    //如果是下面这样写了,那么视图上直接写{{msg}}就行了
    computed:{
        msg(){
            return this.$store.state.msg
        }
    },
    //可以点击触发这个函数,也可以直接把事件写在视图里
    // methods:{
    //     fn(){
    //         this.$store.commit('setMsg',[])
    //     }
    // }
}
2.需要在vue实例里面挂载store
new Vue({
    render:h => h(App),
    //挂载到new Vue的这个地方 => 实现全局状态管理(所有组件都可以获取)
    store
}).$mount('#app')
```

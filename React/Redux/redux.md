## Redux 的核心思想

what：
Redux 是一个使用叫做‘action’的事件来个管理和更新应用状态的模式和工具库；
它以集中式 Store 的方式对整个应用中使用的状态进行集中管理，其规则确保状态只能以可预测的方式更新

### JS 纯函数

> what?
>
> 1. 确定的输出：一定会产生确定的输出
>
> 函数内部，不能依赖于外部的变量 => 函数运行不能依赖于闭包外面的变量
>
> 2. 函数在执行过程中，不能产生副作用
>
> 不能改变外面的变量：在执行一个函数时，除了返回函数值之外，还对调用函数产生了附加的影响

- 优势
  - 不需要关系传入的内容是如何获得或者因爱其他外部变量是否发生了改变
  - React 的组件也像纯函数 => 不能修改 props

### Redux 的概念

#### 为什么需要 Redux

> js 需要管理的状态越来越多：
>
> 服务器返回的数据， 缓存数据， 用户操作产生的数据， UI 的状态：某些元素是否被选择，是否显示加载动效，当前分页
>
> 当应用程序复杂时，state 在什么时候，为什么发生变化，发生了什么变化，会变得难以控制和追踪
>
> React 主要负责管理视图，state 如何维护需要我们自己决定 => UI = render(state)

- Redux 是一个帮我们管理 state 的容器
- Redux 是 JS 的状态管理器，提供了可预测的状态管理

### Redux 的核心理念

#### Store

> 存储相关数据 => 对象

#### action

> 所有的数据变化，必须通过派发（dispatch）action 来更新
>
> action 是一个普通的 JS 对象，用来描述这次更新的 type 和 content

强制使用 action 的好处

- 清晰的知道数据到底发生了什么变化，所有的数据变化都是可追踪，可预测的
- 一般会通过函数来定义，返回一个 action 对象

#### reducer

> 将 state 和 action 联系在一起
>
> reducer 是一个纯函数
>
> 目的：将传入的的 state 和 action 结合在一起生成一个新的 state ： (state,action) => newState
> 接收上一个结果（state）和当前项（action 对象），根据这些参数计算出一个新的 state，并返回该新的 state

#### demo

```js
//1.创建一个空项目文件夹
//2.创建一个src文件夹
npm init -y //生成package.json
npm install redux / yarn add redux


```
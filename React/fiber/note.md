1. 一个 Fiber 对像代表一个即将渲染或者已经渲染的组件（ReactElement）
2. 一个组件可能对应两个 fiber => current 和 WorkInProgress

#### 1. _Hook_ 与 *fiber*的关系

```
    在fiber对象中有一个属性 fiber.memoizedState 指向 fiber 节点的内存状态。
    在function组件中， fiber.memoizedState就指向Hook队列（Hook队列保存了function类型的组件状态）
```

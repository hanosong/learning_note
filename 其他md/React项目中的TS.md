# React项目中的TS



### 1：父传子

必须给子组件的Props对象，设置一个接口.

```JavaScript
// 子组件props的接口
type BoxPropsType = {
  msg: string,
  fn: (i: number) => void
}

// 把Box变成React的函数组件类型. props接口写在FC的 <> 中
export const Box: FC<BoxPropsType> = ({ msg, fn }) => {
  return (
    <div>
      <h3>你好---{msg}</h3>
      <button onClick={() => {fn(10)}}>按钮</button>
    </div>
  )
}

// 不是FC组件的子组件写法
export const Box = function({ msg, fn }: BoxPropsType) {
   return (
    <div>
       <h3>你好---{msg}</h3>
       <button onClick={() => {fn(10)}}>按钮</button>
     </div>
   )
}

```

### 2：useState

应该给useState声明的数据指定某个类型

```javascript
// 指定一个number类型。也可以不指定，因为有了初始值，可以自动判断count是number类型
const [count, setCount] = useState<number>(0);
// 给数组的元素指定类型。否则后期无法修改这个arr.
const [arr, setArr] = useState<itemType[]>([]);

```



### 3: useRef

应该给获取的标签指定类型。绑定什么标签，就指定什么类型。

绑定div，则指定HTMLDivElement类型。

绑定button，则指定HTMLButtonElement类型。

绑定input，则指定HTMLInputElement类型。

标签的原型链：

HTMLDivElement => HTMLElement => Element => Node => EventTarget => Object

```javascript
const oEl = useRef<HTMLDivElement>(null)
```



### 4: 事件对象

1：onClick，onmouseover，onmouseout => MouseEvent

2：onChange => ChangeEvent

3:  onFocus, onBlur => FocusEvent

4:  onInput, onSubmit => FormEvent

5:  onKeydown, onKeypress, onKeyup => KeyBoardEvent

6:  onScroll => UIEvent



### 5: 断言

把类型A强制当成类型B来对待。

```javascript
(A as B).push(9090);
```




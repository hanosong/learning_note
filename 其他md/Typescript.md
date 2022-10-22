# Typescript



typescript是javascript的超集.简称TS。

TS包含JS。

TS比JS多了类型这么一个很重要的概念。

类型（type）是TS的灵魂。

JS + 类型声明 = TS;

JS，默认是弱类型的语言。不需要指定类型。

TS，声明变量，函数参数都需要为其指定类型。（类似于强语言，java，c++）。



React的TS项目，tsx后缀的是组件。ts后缀的是js文件。



### 一：变量



#### 1.1 number, string, boolean变量声明。

声明变量的时候，应该指定类型。

1：显式指定。

2：赋值对应的数据类型。

指定类型之后,就不可以把变量变成其他类型的值.

```JavaScript
// 声明一个number类型

// 显式指定number
let x: number; 
// 通过赋值100来让x变成number类型.
let x = 100;

// let x: number;
// let y: string;
// let z: boolean;
```



#### 2.2 声明数组

声明数组两种方式.

声明数组,除了指定数组类型外,还得指定数组元素的类型.

```JavaScript
const arr: Array<number> = [1, 2, 3];
const arr: number[] = [1, 2, 3];

// 二维数组
const arr: number[][] = [[1, 2, 3]];
```



#### 2.3 any类型

any类型的值, 可以后续随便改变它的数据类型.

```JavaScript
// 声明了一个变量,不赋值,则默认是any类型.
let x;
// 显示指定x是一个any类型的变量.
let x: any;

x = 100;
x = '你好';
x = true;
x = [];
```



### 二：接口

接口 => 简单来说, 就是一个自定义的数据类型. (数据结构)

两种声明接口的方式

```JavaScript
// ? 表示可以有,也可以没有
// 可以接口里面有别的接口
type obj = {
	name?: string,
	age: number,
	ex: person
}
// 一个key,可以有多个类型.
interface person {
	name: string | number
}
// 按接口创建数据。
const arr: obj[] = [{
    name: '幂幂'，
    age： 32，
    ex： {
    	name： '凯威'
	}
}];

// 声明的同时直接使用接口
const oYm: {name: string | number} = { name: 'mimi' }

```



### 三：函数

使用函数声明时，应该给形参指定类型，也可以给返回值指定类型。

```javascript
// 参数x是number类型，返回值是number类型
function fn(x: number):number{
	return x + 1
}
```

还可以给函数写接口.

给函数写接口，就是要声明参数和返回值的类型。

```javascript
// method表示这样的一种函数：没有参数，返回空值
type method = () => void;
// method表示这样的一种函数：没有参数，没有返回值值
type method = () => never;
// interface写函数接口. => 必须改成 :
interface method {
    () : void;
}

// 两个参数，x是number，y是string类型，返回值是string
// y参数可以填，也可以不填.
type method = (x: number, y?: string) => string;
```



### 四：泛型

就是可变的类型。用于函数和接口中

```javascript
// 函数中的泛型
function fn<T>(x: T) {}

fn<string>('111')

// 类型中的泛型
type method<T> = {
	name: T
}

const obj:method<string> = {}

```




















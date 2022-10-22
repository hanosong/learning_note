### 1. 链式请求调用

原理: (接力)

1. 第一次请求的结果,是第二次请求的参数
2. 第二次请求必须在第一次请求结束之后,再开始

#### 1.axios 的链式调用

例: 第一次请求的值, 传递给第二个服务器进行渲染

```js
//默认指定一个url值
axios.defaults.baseURL = "http://localhost:8080/php/";

//创建函数,函数的实参传递给axios的实参
function getData(url, params) {
  //每次调用都能return一个promise实例,第二个参数需要解构
  return axios.get(url, { params });
}

//调用
//拿到第一个服务器里面的数据
getData("getList.php")
  //调用的时候会触发then
  .then((res) => {
    //传递给第二个服务器
    return getData("1.get.php", {
      username: res.data.name,
      age: res.data.age,
    });
  })
  .then((res) => {
    console.log(res);
  });

//注意:如果在axios调用里面不解构params的话,下面的传值需要写成
// return getUrl("1.get.php", {
//     params: {
//       username: res.data.username,
//       age: res.data.age,
//     },
//   });
```

#### 2.使用 async,await 改写链式调用

```js
axios.defaults.baseURL = "http://localhost:8080/php/";

async function getData() {
  //请求数据 (返回就是Promise的结果, 可以是成功的,也可以是失败的.)
  //把返回值 赋值给res1
  //可以把res1解构成{data: { username, age } }

  let res1 = await axios.get("getList.php");
  let res2 = await axios.get("1.get.php", {
    params: {
      username: res1.data.username,
      age: res1.data.age,
    },
  });
  //打印检查结果
  console.log("res", res2.data);
}
getData();
```

### 二. async 和 await => 终极异步编程解决方案

1. 作用: 和 Promise 差不多
2. 本质: async 和 await 是 Generator 函数的语法糖, 它包含了 Promise 的特性

3. 与 Promise 相比:
   优点: 比 Promise 的写法更简单直观 => 把异步写成了同步的形式
   同步代码 => 从上往下写,从上往下执行
   异步代码 => ES5: 回调套回调 ; Promise: 前面的 then 接后面的 then

   async => 声明函数的时候用, 表明内部可能有异步操作
   await => 必须使用在 async 函数里面, 后面必须是 Promise 操作.
   它可以让 await 后面的代码, 在异步操作结束后自动执行

   注意: await 后面的是同步任务, await 下面的才是异步微任务

```js
   例:
   //如果没有写 async
   //=> SyntaxError: await is only valid in async functions and the top level bodies of modules
   async function fn () {
   //等待 1s 的异步
   //如果没写 await => 直接打印 1000,这会变成一个同步任务
   await new Promise ((resovle, reject) => {
   setTimeout(() => {
   resovle();
   }, 1000)
   })
   // 1 秒结束后,直接打印.(这个打印,会自动等待前面的异步操作结束.然后执行)
   console.log('1000);
   }
   fn();
```

### 事件循环和 async

    await下面的代码，相当于写在then内，是微任务。
    // 同:[1,6,5]
    // 微:[4,7,3]
    // 宏:[2]

```js
console.log(1);

setTimeout((res) => {
  console.log(2);
}, 0);

async function getData() {
  // 这里fn是同步执行。
  await fn();
  // show是fn的微任务.
  await show();
  // 这个打印是异步执行，而且是微任务.
  console.log(3);
}

new Promise((resolve, reject) => {
  resolve();
}).then((res) => {
  console.log(4);
});

function fn() {
  console.log(5);
}

function show() {
  console.log(7);
}

console.log(6);

getData();
```

### 各种 async 函数

    1. 事件句柄
        oBtn.onclick = async function (){
            let res = await axios.get('接口地址', {params:{参数: 值}})
        };
    2. 回调函数
        setInterval(async ()=>{})
    3. 箭头函数
        async () => {}
    4. 对象里面的方法
        const oYm = {
            fn: async function (){}
        }
        对象里面的方法简写
        const oYm = {
            async fn(){}
        }

### 注意

async 返回一个 promise 对象,你手动 return 其他东西出来都没用

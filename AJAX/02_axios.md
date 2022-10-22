### axios 是什么?

1.  axios
    =>1. 是一个第三方的 http 库
    =>2. axios 集成了 Promise, 它会返回一个 Promise 对象
2.  axios 的方法
    1.then => 写请求数据成功后要做的事情
    如果 then 中的 res 是个数组,数组中的元素是对象,我们要拿到数组中的某个对象

         => 对 res 进行解构 => ({要拿到的对象名}) => {对象名.forEach}
         res => 服务器返回的数据(里面包含 data..属性)

    2.catch =>请求出现异常,或者失败的时候会触发 catch 的回调

        =>.then()后面接.catch(err => {
                console.log(err)
                axios请求失败了查看失败原因,或者使其显示请求失败
            })

### 如何发送参数

如何发送参数 ? => 分为 GET 和 POST

### 1.GET 发送参数的方法:

法 1 => 将序列号字符串直接拼接到 url 后面
法 2 => get 要发送的参数,需要填在一个属性对象(params)内;

```js
params 内部的每个键名表示一个数据

        axios({
            method: 'GET',
            url: 'http://localhost:8080/php/1.get.php',
            params:{
                username: 'mimi',
                age: 100
            }
        }).then( res => {
            console.log('res', res)
        })
```

#### 2.POST 发送参数的方法:

1. 修改请求头
2. 把序列号字符参数放到 data 属性中

```js
axios({
    method: 'POST',
    url: 'http://localhost:8080/php/1.post.php',
    //修改请求头
    headers: {
        'Content-Type' : 'applcation/x-www-form-urlencoded',
        //如果是其他类型的请求头
        //例如: 'Authorization': 'token afafasfsafsa',

    }
    //除了get之外的其他请求方法 => 通过data发送参数
    data: 'username=mimi&age=41',
    //除非Content-Type的值是application/json => data的值为一个对象
    // data:{
    //     username: 'mimi',
    //     age:8888,
    // }
}).then(res => {
    console.log('res',res);
})
```

### 设置 baseURL

#### 1.如何使用在全局设置相同的 url 部分

想要将 url 公共的部分提取出来 =>

```js
// 在全局设置一个共同的 url 部分
axios.defaults.baseURL = "http://localhost:8080/php/";
//post请求
axios({
  metho: "POST",
  //每次请求,只需要在url上写不同的url部分
  url: "1.post.php",
  data: "username=mimi&age=23",
}).then((res) => {
  console.log(res);
});
//get请求
axios({
  method: "GET",
  url: "1.get.php",
  params: {
    username: "幂幂",
    age: 100,
  },
}).then((res) => {
  console.log("res--get", res.data);
});
```

#### 2.对不同类型的 url 创建属于它们自己的公共 url

=>不想定死 url 的公共部分
步骤:
=>1. create 一个实例 1 => 配置一个公用请求选项
=>2. 后续通过实例 1,发起 ajax 请求 => 使用实例 1 中的公共选项进行请求
=>3. 当公共选项与实际请求时的选项有冲突, 以实际请求的选项为准

```js
//请求实例1
const request1 = axios.create({
  baseURL: "http://localhost:8080/ajax/php/",
  metho: "POST",
});
//请求实例2
const request2 = axios.create({
  baseURL: "http://iloveu:1314/php/",
  metho: "GET",
});
//请求接口1
request1({
  //与实际情况冲突的时候,以实际为准(覆盖)
  method: "GET",
  url: "1.post.php",
  data: "username=mimi&age=8080",
}).then((res) => {
  console.log(res.data);
});
//请求接口2
request2({
  url: "1.get.php",
  pramas: {
    username: "mimi",
    age: 32,
  },
}).then((res) => {
  console.log(res.data);
});
```

### 简写请求

背景:
axios(),是一个万能请求 => 不管什么请求都可以用 axios()来实现

#### 1. get 的简写

```js
/** 
    语法: axios.get(参数1, {参数2}).then().catch()..
    参数1: url地址
    参数2: 需要传递给后端的请求参数
        => 需要写成一个对象,对象内的params就是请求参数
    请求成功后要做的事情, 依旧是用then触发
**/
axios
  .get("http://localhost:8080/php/1.get.php", {
    params: {
      username: "mimi",
      age: 100,
    },
  })
  .then((res) => {
    console.log(res.data);
  });
```

#### 2. post 的简写

```js
//地址简写
const request1 = axios.create({
  baseURL: "http://localhost:8080/php/",
});

//不用设置,直接默认就是content-Type: application/x-www-form-urlencoded
//如果content-type是对象,那么和写法和get一样
request1.post("1.post.php", "username=mimi&age=100").then((res) => {
  console.log(res.data);
});
```

### 使用 axios 调用接口请求总结

1.  先判断是否为链式调用?
    a: 如果不是: 直接使用 axios.get 即可
    b: 如果是: 创建一个调用某个接口的函数

        => function getUrl (url params){
        return axios.get(url, {params})
        }

2.  如果是链式调用 每次调用

```js
    getUrl('接口地址', {参数: 值})
    .then(res => 拿到接口地址的数据
    //如果在请求完第一个服务器后,
    //需要用第一个服务器请求到的数据,作为下一次请求的参数
    return ('第二次请求的 url', {params})
    )
```

3.  如果有多次请求调用接口,第二次请求和第三次请求没有逻辑上的先后
    => 把后面的请求封装到函数中,
    在拿到第一个服务器的参数后,
    把参数作为实参调用后面的请求函数

```js
    做法 1:
    getUrl('接口地址', {参数: 值})
    .then(res => 拿到接口地址的数据
    //如果在请求完第一个服务器后,
    //需要用第一个服务器请求到的数据,作为下一次请求的参数
    fn1 ('第二次请求的 url', {params:res.data...})
    fn2 ('第二次请求的 url', {params:res.data...})
    )

    做法2:
    getUrl('接口地址1', {参数: 值})
    .then(res => {拿到接口地址的数据
        getUrl('接口地址2', {参数: 接口1的值})
        .then(res => { 接口地址二要做的事情})

        return getUrl('接口地址3', {参数: 接口1的值})
    })
    .then(res => {接口3要做的事情 })
```

    4. 如果使用 async 改写的话 => 1.请求接口的函数前面加上 async 2.去掉 then => let res = await getUrl('接口', '参数')

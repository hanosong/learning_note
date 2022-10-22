### 1.ajax 是什么

#### 1.背景

1. 网页上的数据是如何获取的?
   => 通过服务器: ajax(fetch, websocket)
   => 前端页面请求服务器获取数据: 请求的是服务器上的一个后端文件

2. ajax 的目的 => 和服务器进行交互
3. ajax 的原理:
   => 1. ajax 是一个 js 的对象
   => 2. 通过实例方法 open 发起请求,请求方法: 'GET'; 'POST'; 'DELETE'; 'PUT'
   => 3. send 发送请求正文
   => 4. 通过 onreadystatechange 事件监听请求过程,以达到异步更新的作用

4. ajax 的特性: 可以实现一种异步的局部更新,不需要刷新整个页面

#### 2. ajax 请求的过程

1.  请求过程类比: 前段请求后端 => 男生搭讪女生

    =>1.确定目标打招呼
    =>2.告诉别人你的目的
    =>3.等待对方回应 =>结果

        a. 被拒绝
        b. 没回应
        c. 她答应

2.  ajax 请求过程如下:

##### 使用 GET 方式发起请求

    > GET 发送的参数 => 可以在 url 后面拼接要发送的参数
    >
    >       1. 发送参数的方式:  在url后 + ? + 参数
    >       2: 参数格式(序列号字符串)
    >       3: 参数1名字 = 参数1的值 & 参数2名字 = 参数2的值
    >       4: 注意 => 参数的名字,前后端必须保持一致

```js
const xhr = new XMLHttpRequest();
//1.确定服务器的地址  2.确定请求方法
xhr.open("GET", "http://localhost:8080/php/1.get.php?username=mimi&age=32");
//2.发送请求正文
xhr.send();
//3.等待服务器响应
xhr.onreadystatechange = function () {
  //4.如果通信结束了
  if (xhr.readyState === 4) {
    //5.如果请求成功了
    if (xhr.status === 200) {
      //6.请求成功了我要做什么事
      console.log("res", xhr.responseText);
    }
  }
};
```

> readyState => 状态值
> readyState 0=>XMLHttpRequest 对象初始化 1=>载入 2=>载入完成 3=>解析 4=>完成

> status => XMLHttpRequest 对象的一个属性，表示响应的 HTTP 状态码

##### 使用 POOST 方式发起请求

```js
const xhr = new XMLHttpRequest();
xhr.open('POST','http://localhost:8080/php/1.post.php');
//post发送参数,需要把序列号参数写在send中
=> send里面的参数,是以何种数据格式传递给后端,需要通过请求头content-type来设置
=>不设置,默认为text/plain纯文本的方式发送给后端
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//可以在请求头中添加自定义字段 => 常见于token
xhr.setRequestHeader('Authorization','mimi');

xhr.send('username=mimi&age=23');
xhr.onreadystatechange = function(){
    if(xhr.readyStates === 4){
        if(xhr.status === 200){
            console.log('res',xhr.responseText)
        }
    }
}


//如果是一个对象,如何处理成参数1名字 = 参数1的值 & 参数2名字 = 参数2的值的格式?
    const data = {
        username : "mimi",
        age: 32
    }
1. 先创建一个数组
    const arr = [];
2. 把对象里的属性, 转为数组元素 key = value的形式
    => 对象如何转为数组? Object.entries(data) => [['username', 'mimi'], ['age' , 32]]
    => 遍历的时候使用解构
    Object.entries(data).foreach(([key,val]) => {
        arr.push(key+ '=' +val);
    } )
3. 把数组转为字符串
    arr.join('&');
```

### 使用浏览器查看请求信息

前后端交互时，
前端给后端发送数据，包括: 请求正文(参数) + 请求头
后端返回数据给前端，包括: 响应正文(前端要的数据) + 响应头

    请求正文:  => 可以给个微信吗
    Request URL => 你请求的服务器url
    Request Method => 请求的方法
    Status Code => 200 请求成功 304 重定向

    响应正文:  => 可以,这是我的微信二维码

    头信息 => 双方的第一印象
    RequestHeader => 请求头(请求时默认携带的信息)  => 我是男的,很帅
    ResponseHeader => 响应头(相应时默认携带的信息) => 美女的声音很好听

### 怎么知道服务器返回了什么数据给我?

#### 1.ajax 的代码写好了,如何知道服务器给我返回了什么数据?

1: 通过 network 查看
2: 在请求成功后的地方,打印服务器返回的结果(xhr.responseText)

```js
应用: 将请求到的数据, 经过处理, 重新渲染到页面上(dom操作);
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/php/getList.php");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      //如何判断拿到的数据是什么格式? => typeof xhr.responseText
      //如果这里拿到的是json字符串,把json字符串改为json对象后,才可以使用
      const data = JSON.parse(xhr.responseText);
      //把请求到的数据,进行渲染
    }
  }
};
```

#### 2.什么时候请求数据

    什么时候需要请求数据, 就在对应的事件里面把对应的ajax的ajax写在对应的代码块内
    需要几次,就写几次ajax

### 怎么知道请求后会返回什么数据?

    对于一个给定的服务器地址: http://localhost:8080/php/getList.php
    如何知道请求他,能得到什么数据?
    如何知道按照要求填写参数后,能否正常请求?
    如何做测试接口?
    => 解决方法
        1.写ajax代码测试
        2.使用postman等工具测试

### 封装一个 ajax 函数

```js
function ajax(methods, ulr, data, success) {
  const xhr = new XMLHttpRequest();
  if (data && methods === "GET") {
    url += "?" + data;
  }
  if (methods === "POST") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  } else {
    xhr.send();
  }

  xhr.onreadysatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        //请求成功后执行回调函数内的代码
        success(xhr.responseText);
      }
    }
  };
}
```

```js
//调用
ajax(
  "GET",
  "http://localhost:8080/ajax/php/1.get.php",
  "username=幂幂&age=32",
  function (res) {
    console.log("res--get", res);
  }
);

ajax(
  "POST",
  "http://localhost:8080/ajax/php/1.post.php",
  "username=幂幂&age=100",
  function (res) {
    console.log("res--post", res);
  }
);
```

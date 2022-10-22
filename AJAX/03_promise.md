### 1. promise 是什么

#### 1.Promise => 对未来的承诺

?是什么时候出现的? => 是 ES6 新增的特性
?是什么东西? => 标准的异步编程解决方案
?什么是异步编程? => 用代码解决异步操作的需求

#### 2.异步操作的特性:

1.  落后于同步
2.  需要等待一小段时间
3.  总是需要一个函数来实现异步监听
    => 回调函数 , 事件句柄

#### 3.异步监听 => 异步操作完成后,可以得到的响应或通知

ES5 是如何实现异步监听的?

1.  通过回调函数
2.  通过事件句柄
    这两种方式产生的问题
    => 回调函数套回调函数 => 回调地狱

### promise 实例

1. 一个 Promise 实例 => 代表一个异步操作
2. 如何创建一个 Promise 实例? => new

3. Promis 是如何实现异步监听的?
   异步操作成功的监听 => 永远写在 then 里面
   异步操作失败的监听 => 永远写在 catch 里面

```js
const p1 = new Promise((resovle, reject) => {
  //resolve 是 then 的回调,resolve 的实参会传入res
  resolve(实参);
  //reject 是 catch 的回调,reject 的实参会传入res
  reject(实参);
});

p1.then((res) => {
  //兑现承诺要做的事情
});

p1.catch((res) => {
  //没兑现承诺要做的事情
});
```

### 使用 ajax 封装一个 Promise

```js
 //1.封装一个ajax调用函数
function ajax( { method url, data} ){
return new Promise ( ( resolve, reject ) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method,url +'?'+data);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                //成功时执行
                resolve(xhr.responseText);
            }else{
                //失败时执行
                reject(xhr.status)
            }
        }
    }
})
}
//2. 调用函数
ajax({
    method: 'GET',
    url: 'http://localhost:8080/php/1.get.php',
    data: 'username=mimi&age=20'
})
.then(res => {})
.catch(err => {});
```

### Promise 解决了什么问题?

Promise 解决了什么问题?

1.  解决了异步编程中产生回调地狱的问题
2.  解决了异步编程中没有标准的问题
3.  解决了信任的问题
    => 每个 Promise 实例,要么触发 then,要么触发 catch

    => Promise 的实例, 拥有三种状态

    1. pendding (等待中) => 没有 resolve(),也没有 reject()的时候
    2. fulfilled (异步成功了)
    3. rejected (异步失败)

    => 当 pendding 切换到 fulfilled 或者 rejected 时,状态就不会再发生改变了
    不会从 fulfilled 变成 rejected,反之亦然

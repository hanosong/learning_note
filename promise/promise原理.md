### Promise的使用？

#### 1.异步请求的处理方式

##### 函数中没办法在异步操作中return

~~~js
// 错误做法
function requestData( url ) {
	setTimeout( () => {
	  if(url === 'hakwan'){// 成功
	  	let names = ['aaa']
	  	return names  // 错误：异步中无法return出去 => 此时return的是定时器的值
	  } else {
	  	 let message = '请求失败，url错误'
	  	 return message //错误做法
	  }
	}, 2000)
}

const result = requestData('hakwan')
~~~

##### OVSAISS项目中做法

> 弊端：
>
> 1> 要设计和使用正确的callback名称
>
> 2> 如果requestData是别人封装的， 则必须搞清楚这个函数需要怎么去获取到结果

~~~~js
// 设置好成功回调和失败回调
function requestData( url, successCallback, failtureCallback ) {
	setTimeout( () => {
	  if(url === 'hakwan'){// 成功
	  	let names = ['aaa']
	  	successCallback(names)
	  } else {
	  	 let errmessage = '请求失败，url错误'
	  	failtureCallback(errmessage)
	  }
	}, 2000)
}

//调用的时候直接定义成功回调和失败回调
const result = requestData('hakwan',(res) => {console.log(res)},(err) => {console.log(err)})
~~~~



### 2.Promise是什么

> 目的： 给予调用者一个承诺 => 待会我给你回调数据时， 就可以创建一个promise对象
>
> 本质： promise是一个类，本身是一个构造函数

#### Promise的使用

> 当通过new创建Promise对象时，需要传入一个回调函数（executor）
>
> 1. 这个回调函数会被立即执行， 并且给传入另外两个回调函数resolve、reject
> 2. 当调用resolve回调函数时，会执行Promise对象的then方法传入的回调函数
> 3. 当调用reject回调函数时，会执行Promise对象的catch方法传入的回调函数

~~~js
// 基本原理
class Person {
    constructor(callback) {
        let foo = function () { //函数1
            
        }
        let bar = function () { //函数2
            
        }
        callback(foo,bar)
    }
}

new p = new Person(( foo, bar ) => {
    foo();
    bar();
})

const promise = new Promise( (resolve, reject) => { // 传入的这个箭头函数，称之为executor
    console.log('promise传入的函数执行了')
})
~~~

~~~js
// 基本使用
// 在request.js 文件中
function foo(){
    //promise
    return new Promise((resolve,reject) =>{
        //resolve()
        reject()
    })
}
//在main.js中
const fooPromise = foo();
// then方法传入的回调函数，会在Promise执行resolve函数时，被回调
fooPromise.then(() =>{});
fooPromise.catch(() => {})
~~~


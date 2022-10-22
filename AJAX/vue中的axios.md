### 一. 原生 axios 在 vue 中的应用

1. 根据 axios 的触发时机进行分类
   -1: 在指定的事件节点请求(如:点击时请求)
   -2: 默认请求数据 => 在 mounted 钩子函数中写

2. 当在 data 中声明一个对象时,需要注意的一点

```js
data: () => ({
  obj: {},
});
```

如果视图中需要渲染的是 obj 的某个属性的属性,那么 vue 会先报错
=> 因为对象的属性一开始是 undefined,undefined.key 会报错 => 这是因为求值发生在 axios 请求数据之前
=> 但是 html 任然会渲染正确的视图 => 这是因为 axios 请求到数据之后,数据改变导致视图刷新

解决: obj.key1? obj.key1.key2 : ''

总结:函数 fn 写在 mounted 钩子函数中,在 vue 的声明周期中的顺序为
-1:beforeMounte
-2:fn
-3:mounted
=> fn 请求 axios 的时候会触发两次
第一次: 默认挂载的时候调用一次
第二次: 视图更新调用一次

```js
//原生axios直接调用 => 对比下面的封装
axios
  .get("https://autumnfish.cn/search", {
    params: { keywords: "起风了" },
  })
  .then((res) => {
    console.log(res);
  });
```

### 二. axios 在 vue 中的使用

1. 要记得安装

```
npm i axios -S
```

2. 需要导入 improt axios from 'axios';
3. 不是 vue 的依赖,不需要 use

### 三. 模块化管理

1. 单独创建一个文件夹用来放接口文件
2. 创建一个文件放 axios 实例,同时配置公共 url 等 => 命名为 index.js

3. 举例

```js
//index.js
import axios from "axios"; //首先要先导入axios

//创建一个axios实例,配置公共方法
const require = axios.create({
  baseURL: "https://autumnfish.cn/",
  timeout: 2000,
});

//直接导出请求接口的函数
//如果要把这些接口函数重新放到一个新的文件里面(api.js),只需要引入require => import require from './index.js';
//同时require需要导出 => export default require
export function 请求接口1() {
  return require.get(接口1); // 为什么不在这里修改config相关的数据呢? return require({  url:'/search', params, headers:{}})??
  // 因为要全局!!!!配置!!! => 别的请求就不用配了
}
export function 请求接口2() {
  return require.get(接口2);
}

//例如
export function getSongs(params) {
  return require.get("/search", { params });
}
```

```js
//在别的vue组件中引入
1. 要导入
import { 请求接口1 } from 'index.js的url'

2. 调用函数请求axios
请求接口1().then(res => {
    console.log(res)
})

//例如
getSongs({ keywords:'起风了' }).then(res => {
    console.log(res);
})
```

### axios 拦截 => 全局配置

1. axios 属于配置,放在 index.js 中
   注意: 不要给 axios 配置拦截 axios.interceptors => 这是错的,应该给实例配拦截

```js
//请求开始
require.interceptors.request.use(
  function (config) {
    //config形参可以拿到请求配置
    //在return之前,可以对config进行修改 =>例如: config.headers = {"contexType": "application/json" }
    //必须return config 否则为请求失败 => 这就是拦截的作用
    return config; //config就是请求的配置 => 什么是配置?? axios({ methods:'get', url, data, headers:{}})  这些都是
  },
  function (err) {
    return Promise.reject(err); //异常时触发
  }
);
//响应
require.interceptors.response.use(
  function (response) {
    //在return之前可以修改数据 => 例如: return reponse.data => 获取的就是reponse.data 而不是renponse
    return response; //服务器返回的结果,必须return => 不return出去,那就是表明被拦截了(快递被扣了) => 组件拿不到数据
  },
  function (err) {
    return Promise.reject(err);
  }
);
```

2. 作用:
   请求拦截: 请求开始之前触发一些逻辑
   响应拦击: 请求响应得到结果之前,触发一些逻辑

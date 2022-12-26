/**
 * promise 的特点
 * 优点：
 *      1.可以将异步操作以同步操作的流程表达出来 --> 避免层级嵌套
 *      2.提供统一的接口，便于控制异步操作
 *
 * 缺点：
 *      1. 无法暂停
 *      2. 如果不设置回调函数，promise内部抛出的错误不会反应到外部
 *      3. 处于pending状态时， 无法得知目前进展到哪一个阶段
 * promise构造函数接收一个函数函数作为参数，该函数的两个参数为resolve / reject
 * resolve / reject函数
 *      1.在异步操作中，将操作的结果作为参数传递出去，
 *
 */

/*---------------------------------------------------------*/
// 用promise实现ajax
const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application");
    client.send();
  });
  return promise;
};

getJSON("/post.json").then(
  function (json) {
    console.log("Contents:" + json);
  },
  function (error) {
    console.log("出错了:" + error);
  }
);

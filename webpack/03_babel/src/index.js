// 当设置useBuiltIns: entry时，需要引入以下两个
// import "core-js/stable";
// import "regenerator-runtime/runtime";

// 当在react中使用时
import React from "react";
import ReactDOM from "react-dom/client"; // 客户端渲染
import App from "./react/App.jsx";

// ts的编译
import { sum } from "./ts/math";

// 1.ES6中const 定义常量
const message = "hello";

// 2.ES6中的箭头函数
const foo = () => {
  console.log("foo function exec~");
};
foo();

//3.对象的解构
const obj = {
  name: "haha",
  age: 17,
};
const { name, age } = obj;
console.log(name, age);

// 4. 字符串的includes方法
const nikname = "hakwan";
console.log(nikname.includes("kw"));

// 5. 渲染react代码
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />); // 将App渲染到哪？ -> 需要一个模板

// 6.ts
console.log(sum(20, 30));

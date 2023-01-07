/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
  age: 17
};
const {
  name,
  age
} = obj;
console.log(name, age);
/******/ })()
;
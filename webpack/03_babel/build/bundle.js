/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// 1.ES6中const 定义常量
var message = "hello";

// 2.ES6中的箭头函数
var foo = function foo() {
  console.log("foo function exec~");
};
foo();

//3.对象的解构
var obj = {
  name: "haha",
  age: 17
};
var name = obj.name,
  age = obj.age;
console.log(name, age);
/******/ })()
;
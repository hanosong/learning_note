"use strict";
(self["webpackChunkbabel_core_demo"] = self["webpackChunkbabel_core_demo"] || []).push([[179],{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _utils_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/bar */ "./src/utils/bar.js");
/* harmony import */ var _utils_foo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/foo */ "./src/utils/foo.js");




// main.js 作为入口
var message = "hello, main";
console.log(message);

// function bar() {
//   console.log("bar exec ~");
// }

// bar();

// 使用axios
axios__WEBPACK_IMPORTED_MODULE_2__["default"].get("http://123.207.32.32:8080/home/multidata").then(function (res) {
  console.log(res);
});
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
btn1.textContent = "关于";
btn2.textContent = "分类";
document.body.append(btn1);
document.body.append(btn2);
btn1.onclick = function () {
  // 使用魔法注释：
  __webpack_require__.e(/*! import() | about */ 443).then(__webpack_require__.bind(__webpack_require__, /*! ./router/about */ "./src/router/about.js")).then(function (res) {
    res.about();
    res.default();
  });
};
btn2.onclick = function () {
  __webpack_require__.e(/*! import() | category */ 34).then(__webpack_require__.t.bind(__webpack_require__, /*! ./router/category */ "./src/router/category.js", 23));
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/startup prefetch */
/******/ !function() {
/******/ 	__webpack_require__.O(0, [179], function() {
/******/ 		__webpack_require__.E(443);
/******/ 	}, 5);
/******/ }();
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [246,19], function() { return __webpack_exec__("./src/main.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
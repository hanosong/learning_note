import axios from "axios";

import { bar } from "./utils/bar";
import { foo } from "./utils/foo";
import "./css/style.css";
import "./abc";
// main.js 作为入口
const message = "hello, main";
console.log(message);

// function bar() {
//   console.log("bar exec ~");
// }

// bar();

// 使用axios
axios.get("http://123.207.32.32:8080/home/multidata").then((res) => {
  console.log(res);
});

const btn1 = document.createElement("button");
const btn2 = document.createElement("button");

btn1.textContent = "关于";
btn2.textContent = "分类";

document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = () => {
  // 使用魔法注释：
  import(
    /* webpackChunkName: "about" */
    /* webpackPrefetch: true */
    "./router/about"
  ).then((res) => {
    res.about();
    res.default();
  });
};
btn2.onclick = () => {
  import(
    /* webpackChunkName: "category" */
    /* webpackPrefetch: true */
    "./router/category"
  );
};

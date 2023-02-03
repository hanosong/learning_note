// import axios from "axios";

// main.js 作为入口
const message = "hello, main";
console.log(message);

function bar() {
  console.log("bar exec ~");
}

bar();

// 使用axios
// axios.get("http://123.207.32.32:8080/home/multidata").then((res) => {
//   console.log(res);
// });

const btn1 = document.createElement("button");
const btn2 = document.createElement("button");

btn1.textContent = "关于";
btn2.textContent = "分类";

document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = () => {
  import("./router/about");
};
btn2.onclick = () => {
  import("./router/category");
};

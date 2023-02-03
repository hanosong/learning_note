import axios from "axios";
// main.js 作为入口
const message = "hello, main";
console.log(message);

function bar() {
  console.log("bar exec ~");
}

bar();

// 使用axios
axios.get("http://123.207.32.32:8080/home/multidata").then((res) => {
  console.log(res);
});

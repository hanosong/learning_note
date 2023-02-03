import axios from "axios";

// index.js 作为入口
const message = "hello";
console.log(message);

function foo() {
  console.log("foo exec ~");
}

foo();

// 使用axios
axios.get("http://123.207.32.32:9002/lyric?id=1842025914a").then((res) => {
  console.log(res);
});

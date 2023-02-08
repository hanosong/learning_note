// import axios from "axios";
// import dayjs from "dayjs";
console.log(axios, "axios");
axios.get("http://123.207.32.32:9002/lyric?id=1842025914").then((res) => {
  console.log(res, "abc.res");
});
get("http://123.207.32.32:9002/lyric?id=1842025914").then((res) => {
  console.log(res, "abc222.res");
});

let d = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
console.log(d, "d");

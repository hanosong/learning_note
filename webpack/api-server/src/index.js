// koa代码搭建api服务器
// step1: npm init -y 创建一个package.json
// step2: npm install koa @koa/router

const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();

const userRouter = new KoaRouter({
  prefix: "/users",
});

userRouter.get("/list", (ctx, next) => {
  ctx.body = [
    { name: "hakwan", age: 18, hobby: "washfoot" },
    { name: "kobe", age: 35, hobby: "basketball" },
  ];
});

app.use(userRouter.routes());
app.listen(9000, () => {
  console.log("apo服务器exec~");
});

// step3: 启动服务器 node ./src/index.js

// node服务器代理
// webpack => webpack-dev-server
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8000", //最终的请求服务器
    pathRewrite: {
      "^/api": "", // 去掉路径中的api
    },
  })
);

app.listen(9000, () => {
  console.log("express proxy 服务器开启");
});

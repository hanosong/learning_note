代码运行在浏览器上时，是通过打包压缩的
所以，当代码报错需要 debug 时，调试转换后的代码是十分困难的

source-map：
目的: 调试这种转换后不一致的代码
原理：

- source-map 是从已转换的代码，映射到原始的源文件
- 使浏览器可以重构原始源并在调试器中显示重建的原始源

如何使用：

1. 根据源文件，生成 source-map 文件, webpack 在打包时，可以通过配置生成 source-map
2. 在转换后的代码，最后一行添加一个注释，指向 source-map

```js
//# sourceMappingURL=bundle.js.map
/**
 * 该注释会被浏览器解析，查找对应的sourcemap，根据sourcemap还原我们的代码，方便进行调试
 * 注意：浏览器中需要开启这个功能
 * /
```

source-map 生成的文件大小大概是源文件的 2.5 倍

```js
/* sourcemp文件中各字段的作用*/

{
  "version": 3, // source-map的版本号
  "file": "bundle.js", // 打包之后的文件--浏览器正在加载的文件
  "mappings": "AAGAA,QAAQC,IADM,SAIZD,QAAQC,IAAI", // 编码形式是base64 VLQ（可变长度值的编码）-- 用于和源文件信息保持映射，记录代码在第几行第几列

  /*源文件：记录文件名以便还原*/
  "sources": [
    "webpack://source_map/./src/main.js"
  ],
  /*源代码*/
  "sourcesContent": [
    "// 项目入口\r\n// 逻辑相关代码\r\nlet message = \"hello\";\r\nconsole.log(message);\r\n\r\nconst foo = () => {\r\n  console.log(\"foo function exec~\");\r\n};\r\n\r\nfoo();\r\n"
  ],
  /*记录转换之前的名称（打包后名称可能会变）*/
  "names": [
    "console",
    "log"
  ],
  /*还原时的相对的根目录*/
  "sourceRoot": ""
}

```
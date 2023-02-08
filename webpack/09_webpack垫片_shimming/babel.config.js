module.exports = {
  // plugins: [
  //   "@babel/plugin-transform-arrow-functions",
  //   "@babel/plugin-transform-block-scoping",
  // ],
  /**
   * 真实开发会使用预设
   */
  presets: [
    // 普通代码转换的预设
    ["@babel/preset-env"],
    // jsx代码转换的预设
    ["@babel/preset-react"],
    [
      "@babel/preset-typescript",
      {
        corejs: 3,
        useBuiltIns: "usage",
      },
    ], // ts预设， 在这里配置的好处是可以在第二个元素处配置polyfill
  ],
};

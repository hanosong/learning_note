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
    [
      "@babel/preset-env",
      // {
      //   corejs: 3,
      //   useBuiltIns: false, // false -- 不使用polyfill ； entry
      // },
    ],
    // jsx代码转换的预设
    ["@babel/preset-react"],
  ],
};

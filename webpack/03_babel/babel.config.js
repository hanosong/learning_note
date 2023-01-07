module.exports = {
  // plugins: [
  //   "@babel/plugin-transform-arrow-functions",
  //   "@babel/plugin-transform-block-scoping",
  // ],
  /**
   * 真实开发会使用预设
   */
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: false, // false -- 不使用polyfill
      },
    ],
  ],
};

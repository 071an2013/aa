/**
 * 用于为 html 页面添加外部 js 文件引用。
 * @param {Array | String} files 
 */
function OutFileWebpackPlugin(files) {
  if (Object.prototype.toString.call(files) !== '[object Array]') {
    files = [files]
  }
  this.files = files;
}

OutFileWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin("compilation", compilation => {
    compilation.plugin(
      "html-webpack-plugin-before-html-generation",
      (htmlPluginData) => {
        htmlPluginData.assets.js.unshift(...this.files);
      }
    )
  })
}

module.exports = OutFileWebpackPlugin;

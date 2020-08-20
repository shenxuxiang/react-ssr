/**
 * 删除代码中导入的 css
 */

module.exports = function ({ types: babelTypes }) {
  return {
    name: "no-require-css",
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (importFile.search(/\.css$/) > -1) {
          // 如果引入了 css文件，则删除此节点
          path.remove();
        }
      }
    }
  };
};
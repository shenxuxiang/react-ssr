/**
 * 删除代码中导入的 less
 */

module.exports = function ({ types: babelTypes }) {
  return {
    name: "no-require-less",
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (importFile.search(/\.less$/) > -1) {
          // 如果引入了 css文件，则删除此节点
          path.remove();
        }
      }
    }
  };
};
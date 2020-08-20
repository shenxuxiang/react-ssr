const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const middleware = require('webpack-dev-middleware');
const config = require('../config/webpack.config.client.dev.js');
const compiler = webpack(config);
const app = express();
// HTML 模版模块的id
let htmlTemplateModuleId = '';

app.use(middleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: true,
}));

app.use(express.static(config.output.path));

app.use(async (req, res) => {
  const url = req.url;
  if (url === '/favicon.ico') return res.send('');
  
  const fs = res.locals.fs;
  const outputPath = res.locals.webpackStats.toJson().outputPath;
  req.assets = JSON.parse(fs.readFileSync(path.join(outputPath, 'manifest.json')).toString());
  
  clearHtmlTemplateCache();
  const createHTML = importHtmlTemplateModule('htmlTemplate');
  const html = await createHTML(req, res);
  res.send(html);
});

app.listen(3000, function () {
  console.log(chalk.green('start a server at localhost:3000'));
});

function clearHtmlTemplateCache() {
  if (htmlTemplateModuleId) {
    delete require.cache[require.resolve(htmlTemplateModuleId)];
  }
}

function importHtmlTemplateModule(module_path) {
  const files = fs.readdirSync(__dirname);
  const len = files.length;
  for (let i = 0; i < len; i++) {
    if (files[i].startsWith(module_path)) {
      htmlTemplateModuleId = path.resolve(__dirname, files[i]);
      break;
    }
  }
  return require(htmlTemplateModuleId).default;
}

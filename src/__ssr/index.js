import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import RouterComp from '../RouterComp';
import routerConfig from '../routerConfig';
import assets from './middleware/assets';
import convertToStaticRouter from './middleware/convertToStaticRouter';
import matchRouter from './middleware/matchRouter';
import getStore from '../store';

export default async function createHTML(req, res) {
  const url = req.url;
  const staticRouterList = await convertToStaticRouter(routerConfig);
  const { getInitialProps } = matchRouter(url, staticRouterList).component;
  const store = getStore();
  let INIT_DATA = null;
  
  if (typeof getInitialProps === 'function') {
    INIT_DATA = await getInitialProps(store);
  }

  const context = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={INIT_DATA}>
        <RouterComp routerList={staticRouterList} />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  const { linkTags, scriptTags } = assets(req.assets);
  const html = (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="full-screen" content="yes">
        <meta name="x5-fullscreen" content="yes">
        <meta name="screen-orientation" content="portrait">
        <meta name="x5-orientation" content="protrait">
        <link rel="shortcut icon" href="favicon.ico">
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
        ${linkTags.join('')}
      </head>
      <body>
        <div id="root">${context}</div>
        <textarea id="INIT_DATA" style="display: none">${JSON.stringify(INIT_DATA)}</textarea>
        ${scriptTags.join('')}
      </body>
    </html>`
  );
  console.log(html);
  return html;
}
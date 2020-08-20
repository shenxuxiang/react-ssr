import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import RouterComp from './RouterComp';
import routerConfig from './routerConfig';
import matchRouter from './__ssr/middleware/matchRouter';
import getStore from './store';

const store = getStore();
const route = matchRouter(window.location.pathname, routerConfig);

window.INIT_DATA = JSON.parse(document.getElementById('INIT_DATA').value);
window.__STORE__ = store;

route.component.import().then(response => {
  route.component = response.default;
  
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <RouterComp routerList={routerConfig} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

import { matchPath } from 'react-router-dom';

export default function(url, routerList) {
  const len = routerList.length;
  for (let i = 0; i < len; i++) {
    const route = routerList[i];
    if (matchPath(url, route)) return route;
  }
  return {};
}
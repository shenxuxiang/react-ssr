import AsyncLoader from './common/AsyncLoader';

export default [
  {
    exact: true,
    path: '/home',
    component: AsyncLoader(() => import('./pages/Home')),
  },
  {
    exact: true,
    path: '/goods',
    component: AsyncLoader(() => import('./pages/Goods')),
  },
];

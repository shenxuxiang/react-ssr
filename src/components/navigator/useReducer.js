import { useState } from 'react';

export function useReducer(reducer, initState) {
  const [state, setState] = useState(() => initState);
  function dispatch(action) {
    if (typeof action === 'function') {
      // 使用回调函数的形式可以减少添加依赖项
      setState((prevState) => reducer(prevState, action(prevState)));
    } else {
      setState(reducer(state, action));
    }
  }
  return [state, dispatch];
}

export function reducer(state, action) {
  return { ...state, ...action };
}

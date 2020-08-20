import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

function reduxThunk({dispatch, getState}) {
  return function(next) {
    return function(action) {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      } else {
        return next(action);
      }
    };
  };
}

function reduxLogger({getState}) {
  return function(next) {
    return function(action) {
      console.log(`action: "${action.type}" \n`);
      const result = next(action);
      console.log('nextState:', getState());
      return result;
    };
  };
}

export default () => applyMiddleware(reduxThunk, reduxLogger)(createStore)(reducers);
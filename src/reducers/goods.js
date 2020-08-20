import actions from '../actions/goods';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.GOODS_LIST:
      return {...state, goods_list: action.data};
    case actions.NAV_LIST:
      return {...state, nav_list: action.data};
    default: return state;
  }
}

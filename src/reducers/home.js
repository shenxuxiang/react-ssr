import actions from '../actions/home';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.USER_INFO:
      return {...state, user_info: action.data};
    case actions.USER_CONTEXT:
      return {...state, user_context: action.data};
    default: return state;
  }
}

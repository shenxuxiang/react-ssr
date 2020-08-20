import request from '../utils/request';

const action = {
  USER_INFO: 'USER_INFO',
  USER_CONTEXT: 'USER_CONTEXT',
}

export default action;

export function getUserInfo(query) {
  return (dispatch) => {
    return request('home/user_info', query)
      .then(response => {
        dispatch({
          type: action.USER_INFO,
          data: response.data,
        });
        return response.data;
      })
      .catch(err => console.log(err));
  };
}

export function getUserContext(query) {
  return (dispatch) => {
    return request('home/user_context', query)
      .then(response => {
        dispatch({
          type: action.USER_CONTEXT,
          data: response.data,
        });
        return response.data;
      })
      .catch(err => console.log(err));
  };
}

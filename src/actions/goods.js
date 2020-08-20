import request from '../utils/request';

const action = {
  GOODS_LIST: 'GOODS_LIST',
  NAV_LIST: 'NAV_LIST',
}

export default action;

export function getGoodsList(query) {
  return (dispatch) => {
    return request('goods/goods_list', query, 'POST')
      .then(response => {
        dispatch({
          type: action.GOODS_LIST,
          data: response.data,
        });
        return response.data;
      })
      .catch(err => console.log(err));
  };
}

export function getNavList(query) {
  return (dispatch) => {
    return request('goods/nav_list', query, 'GET')
      .then(response => {
        dispatch({
          type: action.NAV_LIST,
          data: response.data,
        });
        return response.data;
      })
      .catch(err => console.log(err));
  };
}

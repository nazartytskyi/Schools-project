export const addNewsAction = (news) => (dispatch) => {
  return dispatch({
    type: 'ADD_NEWS',
    payload: news
  });
};
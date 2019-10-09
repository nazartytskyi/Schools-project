export const setUserFromMongo = user => dispatch => {
  return dispatch({
    type: 'SET_USER_FROM_MONGO',
    payload: user
  });
};

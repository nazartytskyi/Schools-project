
export const setUser = (user) => (dispatch) => {
  return dispatch({
    type: 'SET_USER',
    payload: user
  });
};

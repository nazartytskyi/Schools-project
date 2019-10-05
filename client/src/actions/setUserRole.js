
export const setUserRole = (userRole) => (dispatch) => {
  return dispatch({
    type: 'SET_USER_ROLE',
    payload: userRole
  });
};

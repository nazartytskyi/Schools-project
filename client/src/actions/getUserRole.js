import { auth } from '../components/shared/firebase-service/firebase-service';

export const getUserRole = () => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdTokenResult()
      .then(idTokenResult => {
        return dispatch({
          type: 'GET_USER_ROLE',
          role: idTokenResult.claims.role,
          bindedSchool: idTokenResult.claims.bindedSchool
        });
      })
      .catch(() => {
        console.log('Token not found');
      });
  } else {
    return dispatch({
      type: 'GET_USER_ROLE',
      role: null,
      bindedSchool: null
    });
  }
};

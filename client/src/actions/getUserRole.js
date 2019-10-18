import { auth } from '../components/shared/firebase-service/firebase-service';

export const getUserRole = () => dispatch => {
  auth()
    .currentUser.getIdTokenResult()
    .then(idTokenResult => {
      return dispatch({
        type: 'GET_USER_ROLE',
        payload: idTokenResult.claims.role
      });
    })
    .catch(() => {
      console.log('Token not found');
    });
};

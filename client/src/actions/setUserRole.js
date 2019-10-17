import { auth } from '../components/shared/firebase-service/firebase-service';

export const setUserRole = () => dispatch => {
  auth()
    .currentUser.getIdTokenResult()
    .then(idTokenResult => {
      return dispatch({
        type: 'SET_USER_ROLE',
        payload: idTokenResult.claims.role
      });
    })
    .catch(() => {
      console.log('Token not found');
    });
};

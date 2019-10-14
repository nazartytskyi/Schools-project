import { auth } from '../components/shared/firebase-service/firebase-service';

export const setUserRole = () => dispatch => {
  let userRole = '';
  auth()
    .currentUser.getIdTokenResult()
    .then(idTokenResult => {
      if (idTokenResult.claims.teacher) {
        userRole = 'teacher';
      }
      if (idTokenResult.claims.superadmin) {
        userRole = 'superadmin';
      }
      if (idTokenResult.claims.administration) {
        userRole = 'administration';
      }
      return dispatch({
        type: 'SET_USER_ROLE',
        payload: userRole
      });
    })
    .catch(() => {
      console.log('Token not found');
    });
};

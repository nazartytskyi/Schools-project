import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const setUserRole = (uid, role, bindedSchool) => dispatch => {
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .put(
          `/api/user/${uid}/role`,
          { role, bindedSchool },
          { headers: { authorization: idToken } }
        )
        .then(() => {
          return dispatch({
            type: 'SET_USER_ROLE',
            uid,
            role,
            bindedSchool
          });
        });
    });
};

import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const setUserRole = (uid, role) => dispatch => {
  console.log(uid, 'uid action Create');
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .put(
          `http://localhost:3001/api/user/${uid}/role`,
          { role },
          { headers: { authorization: idToken } }
        )
        .then(() => {
          return dispatch({
            type: 'SET_USER_ROLE',
            uid,
            role
          });
        });
    });
};

import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const setBindedSchool = (uid, schoolId) => dispatch => {
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .post(
          `/api/user/${uid}/bindedschool`,
          { schoolId },
          {
            headers: { authorization: idToken }
          }
        )
        .then(() => {
          return dispatch({
            type: 'SET_BINDED_SCHOOL',
            uid: uid,
            schoolId: schoolId
          });
        });
    });
};

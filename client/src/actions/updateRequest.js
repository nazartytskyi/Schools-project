import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const updateRequest = requestToUpdate => dispatch => {
  let schoolId = '5d8259d20dafb81f14fc859e';
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .post(
          `http://localhost:3001/api/schools/${schoolId}/request`,
          { requestToUpdate },
          { headers: { authorization: idToken } }
        )
        .then(() => {
          return dispatch({
            type: 'UPDATE_REQUEST',
            requestToUpdate,
            schoolId
          });
        });
    });
};

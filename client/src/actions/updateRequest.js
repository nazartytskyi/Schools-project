import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const updateRequest = requestToUpdate => dispatch => {
  let schoolId = requestToUpdate.schoolId;
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .put(
          `/api/schools/${schoolId}/request`,
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

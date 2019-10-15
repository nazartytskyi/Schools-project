import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addRequest = (request, schoolId) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .post(
            `http://localhost:3001/api/schools/${schoolId}/request`,
            {
              request
            },
            { headers: { authorization: idToken } }
          )
          .then(res => {
            return dispatch({
              type: 'ADD_REQUEST',
              payload: res.data,
              schoolId
            });
          });
      });
  }
};

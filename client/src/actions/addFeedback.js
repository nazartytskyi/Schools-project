import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addFeedback = (feedback, schoolId) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .post(
            `/api/schools/${schoolId}/feedback`,
            {
              feedback
            },
            { headers: { authorization: idToken } }
          )
          .then(res => {
            return dispatch({
              type: 'ADD_FEEDBACK',
              payload: res.data,
              schoolId
            });
          });
      });
  }
};

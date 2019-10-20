import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addSchool = school => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .post(
            `/api/schools/`,
            {
              school
            },
            { headers: { authorization: idToken } }
          )
          .then(res => {
            return dispatch({
              type: 'ADD_SCHOOL',
              payload: res.data
            });
          });
      });
  }
};

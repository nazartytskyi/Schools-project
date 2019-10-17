import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addVacancy = (vacancy, schoolId) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .post(
            `http://localhost:3001/api/schools/${schoolId}/vacancy`,
            {
              vacancy
            },
            { headers: { authorization: idToken } }
          )
          .then(res => {
            return dispatch({
              type: 'ADD_VACANCY',
              payload: res.data,
              schoolId
            });
          });
      });
  }
};

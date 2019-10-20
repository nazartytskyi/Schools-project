import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const removeVacancy = (idSchool, idVacancy) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .delete(
            `http://localhost:3001/api/schools/${idSchool}/vacancy/${idVacancy}`,
            { headers: { authorization: idToken } }
          )
          .then(() => {
            return dispatch({
              type: 'REMOVE_VACANCY',
              idSchool,
              idVacancy
            });
          });
      });
  }
};

import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const removeNews = (idSchool, idNews) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .delete(
            `http://localhost:3001/api/schools/${idSchool}/news`,
            { idNews },
            { headers: { authorization: idToken } }
          )
          .then(() => {
            return dispatch({
              type: 'REMOVE_NEWS',
              idSchool,
              idNews
            });
          });
      });
    return null;
  }
};

import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const removeNews = (idSchool, idNews) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        console.log(idToken, 'idToken');
        console.log(idNews, 'idNews');
        console.log(idSchool, 'idSchool');
        axios
          .delete(
            `http://localhost:3001/api/schools/${idSchool}/news`,
            { headers: { authorization: idToken } },
            { idNews }
          )
          .then(() => {
            console.log(idNews);
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

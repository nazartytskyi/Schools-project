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
          .delete(`/api/schools/${idSchool}/news/${idNews}`, {
            headers: { authorization: idToken }
          })
          .then(() => {
            console.log(idNews);
            return dispatch({
              type: 'REMOVE_NEWS',
              idSchool,
              idNews
            });
          });
      });
  }
};

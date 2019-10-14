import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const removeNews = (id) => dispatch => {
  if (auth().currentUser) {
    auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .delete(
          'http://localhost:3001/api/removeNews',
          { id },
          { headers: { authorization: idToken } }
        )
        .then(() => {
          return dispatch({
            type: 'REMOVE_NEWS',
            payload: id
          });
        });
    });
    return null;
  }
  
  }
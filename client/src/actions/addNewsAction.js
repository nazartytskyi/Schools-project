import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addNewsAction = (news, id) => (dispatch) => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios.post(
          `http://localhost:3001/api/schools/${id}/addNews`,
          {
            news: news
          },
          { headers: { authorization: idToken } }
        ).
        then(() => {
          return dispatch({
            type: 'ADD_NEWS',
            payload: news,
            id
          });
        })
      });
  } 
};



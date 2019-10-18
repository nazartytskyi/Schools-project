import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addNewsAction = (news, schoolId) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .post(
            `/api/schools/${schoolId}/addNews`,
            {
              news: news
            },
            { headers: { authorization: idToken } }
          )
          .then(res => {
            return dispatch({
              type: 'ADD_NEWS',
              payload: res.data,
              schoolId
            });
          });
      });
  }
};

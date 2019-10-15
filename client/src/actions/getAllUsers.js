import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const getAllUsers = () => dispatch => {
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .get(`http://localhost:3001/api/allUsers/`, {
          headers: { authorization: idToken }
        })
        .then(res => {
          console.log(res.data, 'action ');
          return dispatch({
            type: 'GET_ALL_USERS',
            allUsers: res.data
          });
        });
    });
};

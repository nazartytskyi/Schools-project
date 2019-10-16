import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addFavoriteSchool = schoolId => dispatch => {
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .post(
          '/api/favoriteSchool',
          { schoolId },
          { headers: { authorization: idToken } }
        )
        .then(() => {
          return dispatch({
            type: 'ADD_FAVORITE_SCHOOL',
            payload: schoolId
          });
        });
    });
  return null;
};

import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const deleteFavoriteSchool = schoolId => dispatch => {
  auth()
    .currentUser.getIdToken()
    .then(idToken => {
      axios
        .delete(
          '/api/favoriteSchool',
          { headers: { authorization: idToken } },
          { schoolId }
        )
        .then(() => {
          return dispatch({
            type: 'DELETE_FAVORITE_SCHOOL',
            payload: schoolId
          });
        });
    });
  return null;
};

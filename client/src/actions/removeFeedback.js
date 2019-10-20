import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const removeFeedback = (idSchool, idFeedback) => dispatch => {
  if (auth().currentUser) {
    auth()
      .currentUser.getIdToken()
      .then(idToken => {
        axios
          .delete(`/api/schools/${idSchool}/feedback/${idFeedback}`, {
            headers: { authorization: idToken }
          })
          .then(() => {
            return dispatch({
              type: 'REMOVE_FEEDBACK',
              idSchool,
              idFeedback
            });
          });
      });
  }
};

import axios from 'axios';
import { auth } from '../components/shared/firebase-service/firebase-service';

export const addVacancy = (vacancy, schoolId) => dispatch => {

            return dispatch({
              type: 'ADD_VACANCY',
              payload: vacancy,
              schoolId
            });

};
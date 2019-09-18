import axios from 'axios';

export const getSchools = () => dispatch => {
  axios.get('http://localhost:3001/api/getData').then((res) => {
    dispatch({
      type: 'GET_SCHOOLS_ACTION',
      payload: res.data.data
    });
  });
};

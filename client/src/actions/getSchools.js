import axios from 'axios';

export const getSchools = () => dispatch => {
  return axios.get('/api/getData').then((res) => {
    dispatch({
      type: 'GET_SCHOOLS_ACTION',
      payload: res.data.data
    });
  });
};


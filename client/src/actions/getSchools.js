import axios from 'axios';

export const getSchools = () => dispatch => {
  return axios.get('http://localhost:3001/api/getSchools').then((res) => {
    dispatch({
      type: 'GET_SCHOOLS_ACTION',
      payload: res.data.data
    });
  });
};

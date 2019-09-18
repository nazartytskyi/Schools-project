import axios from 'axios';

export const simpleAction = () => dispatch => {
  axios.get('http://localhost:3001/api/getData').then((res) => {
    dispatch({
      type: 'SIMPLE_ACTION',
      payload: res
    });
  });
};

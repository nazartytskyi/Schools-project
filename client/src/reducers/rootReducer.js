import { combineReducers } from 'redux';
import schools from './schools';
import users from './users';
export default combineReducers({
  schools,
  users
});

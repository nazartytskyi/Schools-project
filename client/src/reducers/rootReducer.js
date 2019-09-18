import { combineReducers } from 'redux';
import schools from './schools';
import teachers from './teachers';
export default combineReducers({
  schools,
  teachers
});
import { combineReducers } from 'redux';
import entities from './entities_reducer';
import session from './session_reducer';
import errors from '../reducers/session_errors_reducer';

export default combineReducers({
  entities,
  session,
  errors
});
import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errors from '../reducers/session_errors_reducer';

export default combineReducers({
  session: sessionReducer,
  errors
});
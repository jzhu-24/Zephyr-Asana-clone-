import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_SESSION_ERRORS
} from '../actions/session_action';

// create session actions + reducer (add to root reducer)
// add states via containers + add to components

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    case CLEAR_SESSION_ERRORS:
      return [];
    default:
      return state;
  }
};
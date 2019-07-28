import {
  RECEIVE_USERS,
  RECEIVE_USER,
  REMOVE_USER,
} from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case REMOVE_USER:
      const newState = Object.assign({}, state);
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;

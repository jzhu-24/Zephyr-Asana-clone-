import {
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  REMOVE_WORKSPACE
} from '../actions/workspace_actions';
import merge from 'lodash/merge';

const workspacesReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_WORKSPACES:
      return merge({}, state, action.workspaces);
    case RECEIVE_WORKSPACE:
      return merge({}, state, { [action.workspace.id]: action.workspace });
    case REMOVE_WORKSPACE:
      const newState = merge({}, state)
      delete newState[action.workspaceId];
      return newState;
    default:
      return state;
  }
};

export default workspacesReducer;

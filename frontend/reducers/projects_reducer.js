import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT,
  REMOVE_PROJECT
} from '../actions/project_actions';

const projectsReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_PROJECTS:
      return Object.assign({}, state, action.projects);
    case RECEIVE_PROJECT:
      return Object.assign({}, state, { [action.project.id]: action.project });
    case REMOVE_PROJECT:
      const newState = Object.assign({}, state);
      delete newState[action.projectId];
      return newState;
    default:
      return state;
  }
};

export default projectsReducer;

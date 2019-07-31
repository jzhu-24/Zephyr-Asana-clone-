import {
  RECEIVE_PROJECT_FAVORITES,
  RECEIVE_PROJECT_FAVORITE,
  REMOVE_PROJECT_FAVORITE,
} from '../actions/project_favorites_actions';

const projectFavoritesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PROJECT_FAVORITES:
      return Object.assign({}, state, action.projectFavorites);
    case RECEIVE_PROJECT_FAVORITE:
      return Object.assign({}, state, { [action.projectFavorite.id]: action.projectFavorite });
    case REMOVE_PROJECT_FAVORITE:
      const newState = Object.assign({}, state);
      delete newState[action.projectFavoriteId];
      return newState;
    default:
      return state;
  }
};

export default projectFavoritesReducer;

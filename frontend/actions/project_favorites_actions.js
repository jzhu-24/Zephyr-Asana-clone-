import { fetchProjectFavorites, postProjectFavorite, destroyProjectFavorite } from '../util/project_favorites_util';

export const RECEIVE_PROJECT_FAVORITES = 'RECEIVE_PROJECT_FAVORITES';
export const RECEIVE_PROJECT_FAVORITE = 'RECEIVE_PROJECT_FAVORITE';
export const REMOVE_PROJECT_FAVORITE = 'REMOVE_PROJECT_FAVORITE';

const receiveProjectFavorites = projectFavorites => ({
  type: RECEIVE_PROJECT_FAVORITES,
  projectFavorites,
});

const receiveProjectFavorite = projectFavorite => ({
  type: RECEIVE_PROJECT_FAVORITE,
  projectFavorite,
});

const removeProjectFavorite = projectFavoriteId => ({
  type: REMOVE_PROJECT_FAVORITE,
  projectFavoriteId,
});

export const requestProjectFavorites = workspaceId => dispatch => (fetchProjectFavorites(workspaceId)
  .then(projectFavorites => {
    return dispatch(receiveProjectFavorites(projectFavorites))
  }));

export const createProjectFavorite = projectId => dispatch => (postProjectFavorite(projectId))
  .then(projectFavorite => dispatch(receiveProjectFavorite(projectFavorite)));

export const deleteProjectFavorite = id => dispatch => (destroyProjectFavorite(id)
  .then(() => dispatch(removeProjectFavorite(id))));

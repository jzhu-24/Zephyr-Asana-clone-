import { combineReducers } from 'redux';
import workspaces from './workspaces_reducer';
import projects from './projects_reducer';
import projectFavorites from './project_favorites_reducer';
import columns from './columns_reducer';
import tasks from './tasks_reducer';
import users from './users_reducer';

export default combineReducers({
  workspaces,
  projects,
  columns,
  tasks,
  users,
  projectFavorites,
});

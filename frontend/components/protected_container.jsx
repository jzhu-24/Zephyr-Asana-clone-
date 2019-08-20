import { connect } from 'react-redux';
import Protected from './protected';
import { requestWorkspaces } from '../actions/workspace_actions';
import {
  requestColumn,
  requestColumns,
  deleteColumn,
  updateColumn,
  createColumn,
} from '../actions/column_actions';
import { requestProjects, requestProject, updateProject } from '../actions/project_actions';
import { createTask, updateTask, requestTasks, deleteTask } from '../actions/task_actions';
import { createProjectFavorite, requestProjectFavorite, requestProjectFavorites, deleteProjectFavorite } from '../actions/project_favorites_actions';
import { openModal } from '../actions/modal_actions';
import { requestUsers } from '../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const favoritedProjects = {};
  let columnsArray = [];

  if (state.entities.projects[projectId]) {
    columnsArray = state.entities.projects[projectId].column;
  }

  Object.values(state.entities.projectFavorites).forEach(projectFavorite => {
    if (state.session.currentUser === projectFavorite.user_id) favoritedProjects[projectFavorite.project_id] = projectFavorite.id;
  });

  return {
    columns: state.entities.columns,
    projects: state.entities.projects,
    tasks: state.entities.tasks,
    project: state.entities.projects[projectId],
    columnsArray,
    workspaceIds: Object.keys(state.entities.workspaces),
    workspaceId: ownProps.match.params.workspaceId,
    favoritedProjects,
    users: state.entities.users,
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  requestColumns: project_id => dispatch(requestColumns(project_id)),
  requestColumn: id => dispatch(requestColumn(id)),
  requestUsers: () => dispatch(requestUsers()),
  createColumn: column => dispatch(createColumn(column)),
  updateColumn: column => dispatch(updateColumn(column)),
  deleteColumn: id => dispatch(deleteColumn(id)),
  requestProject: id => dispatch(requestProject(id)),
  requestProjects: () => dispatch(requestProjects()),
  requestTasks: columnId => dispatch(requestTasks(columnId)),
  updateProject: project => dispatch(updateProject(project)),
  updateTask: task => dispatch(updateTask(task)),
  createTask: task => dispatch(createTask(task)),
  deleteTask: id => dispatch(deleteTask(id)),
  editTask: () => dispatch(openModal('editTask')),
  createProjectFavorite: projectId => dispatch(createProjectFavorite(projectId)),
  deleteProjectFavorite: projectId => dispatch(deleteProjectFavorite(projectId)),
  requestProjectFavorite: projectId => dispatch(requestProjectFavorite(projectId)),
  requestProjectFavorites: () => dispatch(requestProjectFavorites()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Protected);

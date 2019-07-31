import { connect } from 'react-redux';
import ProjectHome from './project_home';
import { requestProjects, deleteProject } from '../../actions/project_actions';
import { createProjectFavorite, requestProjectFavorites, deleteProjectFavorite } from '../../actions/project_favorites_actions';
import { openModal } from '../../actions/modal_actions';

const selectProjects = ({ projects }, workspaceId) => {
  return Object.values(projects).filter(project => project.workspace_id === parseInt(workspaceId));
};

const mapStateToProps = (state, ownProps) => {
  const currentWorkspaceId = ownProps.match.params.workspaceId;
  const favoritedProjects = {};

  Object.values(state.entities.projectFavorites).forEach(projectFavorite => {
    if (state.session.currentUser === projectFavorite.user_id) favoritedProjects[projectFavorite.project_id] = projectFavorite.id;
  });

  return {
    favoritedProjects,
    projects: selectProjects(state.entities, currentWorkspaceId),
  };
};

const mapDispatchToProps = dispatch => ({
  requestProjects: workspaceId => dispatch(requestProjects(workspaceId)),
  deleteProject: id => dispatch(deleteProject(id)),
  createProjectFavorite: projectId => dispatch(createProjectFavorite(projectId)),
  deleteProjectFavorite: projectId => dispatch(deleteProjectFavorite(projectId)),
  requestProjectFavorites: workspaceId => dispatch(requestProjectFavorites(workspaceId)),
  createProject: () => dispatch(openModal('createProject')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectHome);

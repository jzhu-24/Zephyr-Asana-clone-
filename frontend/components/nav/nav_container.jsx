import { connect } from 'react-redux';
import Nav from './nav';
import { requestWorkspace } from '../../actions/workspace_actions';
import { requestProjects, deleteProject } from '../../actions/project_actions';
import { requestProjectFavorites } from '../../actions/project_favorites_actions';
import { openModal } from '../../actions/modal_actions';

const selectProjects = ({ projects }, workspaceId) => {
  return Object.values(projects).filter(project => project.workspace_id === parseInt(workspaceId));
};

const mapStateToProps = (state, { match }) => {
  const currentWorkspaceId = match.params.workspaceId;
  const favoritedProjects = [];

  Object.values(state.entities.projectFavorites).forEach(projectFavorite => {
    favoritedProjects.push(state.entities.projects[projectFavorite.project_id]);
  });

  return {
    currentWorkspace: state.entities.workspaces[currentWorkspaceId],
    projects: selectProjects(state.entities, currentWorkspaceId),
    favoritedProjects,
  };
};

const mapDispatchToProps = dispatch => ({
  requestWorkspace: id => dispatch(requestWorkspace(id)),
  requestProjects: workspaceId => dispatch(requestProjects(workspaceId)),
  deleteProject: id => dispatch(deleteProject(id)),
  requestProjectFavorites: workspaceId => dispatch(requestProjectFavorites(workspaceId)),
  createProject: () => dispatch(openModal('createProject')),
  editProject: id => dispatch(openModal('editProject', id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

import { connect } from 'react-redux';
import ProjectHome from './project_home';
import { requestProjects, deleteProject } from '../../actions/project_actions';
import { openModal } from '../../actions/modal_actions';

const selectProjects = ({ projects }, workspaceId) => {
  return Object.values(projects).filter(project => project.workspace_id === parseInt(workspaceId));
};

const mapStateToProps = (state, ownProps) => {
  const currentWorkspaceId = ownProps.match.params.workspaceId;

  return {
    projects: selectProjects(state.entities, currentWorkspaceId),
  };
};

const mapDispatchToProps = dispatch => ({
  requestProjects: workspace_id => dispatch(requestProjects(workspace_id)),
  deleteProject: id => dispatch(deleteProject(id)),
  createProject: () => dispatch(openModal('createProject')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectHome);

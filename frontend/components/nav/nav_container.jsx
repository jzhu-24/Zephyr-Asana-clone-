import { connect } from 'react-redux';
import Nav from './nav';
import { requestWorkspace } from '../../actions/workspace_actions';
import { requestProjects } from '../../actions/project_actions';

const selectProjects = ({ projects }, workspaceId) => {
  return Object.values(projects).filter(project => project.workspace_id === parseInt(workspaceId));
};

const mapStateToProps = (state, { match }) => {
  const currentWorkspaceId = match.params.workspaceId;

  return {
    currentWorkspace: state.entities.workspaces[currentWorkspaceId],
    projects: selectProjects(state.entities, currentWorkspaceId),
  };
};

const mapDispatchToProps = dispatch => ({
  requestWorkspace: id => dispatch(requestWorkspace(id)),
  requestProjects: workspaceId => dispatch(requestProjects(workspaceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

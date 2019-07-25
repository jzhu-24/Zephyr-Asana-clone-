import { connect } from 'react-redux';
import LoggedInView from './logged_in_view';
import { 
  requestWorkspace, 
  requestWorkspaces, 
  deleteWorkspace, 
  updateWorkspace, 
  createWorkspace } from '../../actions/workspace_actions';
import {
  requestProject,
  requestProjects,
  deleteProject,
  updateProject,
  createProject
  } from '../../actions/project_actions';
import { logout, clearErrors } from '../../actions/session_actions';

const mapStateToProps = (state, { match, errors }) => ({
  workspaces: Object.values(state.entities.workspaces),
  projects: Object.values(state.entities.projects),
  currentWorkspace: state.entities.workspaces[parseInt(match.params.workspaceId)],
  currentProject: state.entities.projects[parseInt(match.params.projectId)],
  errors: errors
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  requestWorkspace: id => dispatch(requestWorkspace(id)),
  createWorkspace: workspace => dispatch(createWorkspace(workspace)),
  updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
  deleteWorkspace: id => dispatch(deleteWorkspace(id)),
  requestProjects: () => dispatch(requestProjects()),
  requestProject: id => dispatch(requestProject(id)),
  createProject: project => dispatch(createProject(project)),
  updateProject: project => dispatch(updateProject(project)),
  deleteProject: id => dispatch(deleteProject(id)),
  logout: () => dispatch(logout()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInView);
import { connect } from 'react-redux';
import Protected from './protected';
import { 
  requestWorkspace, 
  requestWorkspaces, 
  deleteWorkspace, 
  updateWorkspace, 
  createWorkspace } from '../../actions/workspace_actions';
import { logout, clearErrors } from '../../actions/session_actions';

const mapStateToProps = (state, { match, errors }) => ({
  workspaces: Object.keys(state.entities.workspaces).map(id => state.entities.workspaces[id]),
  currentWorkspace: state.entities.workspaces[parseInt(match.params.workspaceId)],
  errors: errors
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  requestWorkspace: id => dispatch(requestWorkspace(id)),
  createWorkspace: workspace => dispatch(createWorkspace(workspace)),
  updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
  deleteWorkspace: id => dispatch(deleteWorkspace(id)),
  logout: () => dispatch(logout()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Protected);
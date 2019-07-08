import { connect } from 'react-redux';
import WorkspaceIndex from './workspace_index';
import { logout } from '../../actions/session_actions';
import { requestWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = state => ({
  workspaces: Object.keys(state.entities.workspaces).map(id => state.entities.workspaces[id])
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  logout: () => dispatch(logout()),
  deleteWorkspace: id => dispatch(deleteWorkspace(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceIndex);
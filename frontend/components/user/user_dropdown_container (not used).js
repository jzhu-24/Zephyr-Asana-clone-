import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import { 
  requestWorkspaces, deleteWorkspace, updateWorkspace, createWorkspace
} from '../../actions/workspace_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state, { match }) => ({
  workspaces: Object.keys(state.entities.workspaces).map(id => state.entities.workspaces[id])
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  createWorkspace: workspace => dispatch(createWorkspace(workspace)),
  updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
  deleteWorkspace: id => dispatch(deleteWorkspace(id)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
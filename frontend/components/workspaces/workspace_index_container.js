import { connect } from 'react-redux';
import WorkspaceIndex from './workspace_index';
import { logout } from '../../actions/session_action';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(WorkspaceIndex);
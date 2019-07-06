import { connect } from 'react-redux';
import WorkspaceHeader from '../workspaces/nav_header';
import { requestWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = state => ({
  workspaces: Object.keys(state.entities.workspaces).map(id => state.entities.workspaces[id])
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  deleteWorkspace: id => dispatch(deleteWorkspace(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceHeader);
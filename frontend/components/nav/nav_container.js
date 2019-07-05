import { connect } from 'react-redux';
import Nav from './nav';
import { requestWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = (state, { match } ) => ({
  workspace: state.entities.workspaces[match.params.workspaceId]
});

const mapDispatchToProps = dispatch => ({
  requestWorkspace: id => dispatch(requestWorkspace(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
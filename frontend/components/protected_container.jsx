import { connect } from 'react-redux';
import Protected from './protected';
import { requestWorkspaces } from '../actions/workspace_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    workspaceIds: Object.keys(state.entities.workspaces),
    workspaceId: ownProps.match.params.workspaceId,
  };
};

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Protected);

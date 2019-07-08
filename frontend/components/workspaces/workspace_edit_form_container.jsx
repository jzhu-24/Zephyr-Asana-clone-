import { connect } from 'react-redux';
import WorkspaceEditForm from './workspace_edit_form';
import { updateWorkspace } from '../../actions/workspace_actions';
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceEditForm);
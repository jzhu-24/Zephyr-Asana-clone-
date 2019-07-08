import { connect } from 'react-redux';
import WorkspaceCreateForm from './workspace_create_form';
import { 
  updateWorkspace, 
  createWorkspace } from '../../actions/workspace_actions';
import { logout, clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({errors}) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  createWorkspace: workspace => dispatch(createWorkspace(workspace)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceCreateForm);
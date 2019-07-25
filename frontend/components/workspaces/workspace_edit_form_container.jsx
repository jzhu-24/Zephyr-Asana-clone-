import { connect } from 'react-redux';
import WorkspaceEditForm from './workspace_edit_form';
import { updateWorkspace } from '../../actions/workspace_actions';
import { closeModal } from '../../actions/modal_actions';

const mapDispatchToProps = dispatch => ({
  updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
  closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(WorkspaceEditForm);
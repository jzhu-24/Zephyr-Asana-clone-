import { connect } from 'react-redux';
import WorkspaceEditModal from './workspace_edit_modal';
import { updateWorkspace } from '../../actions/workspace_actions';
import { closeModal } from '../../actions/modal_actions';

const mapDispatchToProps = dispatch => ({
  updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(WorkspaceEditModal);

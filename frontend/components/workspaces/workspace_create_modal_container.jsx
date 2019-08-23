import { connect } from 'react-redux';
import WorkspaceCreateModal from './workspace_create_modal';
import { createWorkspace } from '../../actions/workspace_actions';
import { closeModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/workspace_actions';

const mapStateToProps = ({errors}) => {
  return { errors };
}

const mapDispatchToProps = dispatch => ({
  createWorkspace: workspace => dispatch(createWorkspace(workspace)),
  clearErrors: () => dispatch(clearErrors()),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceCreateModal);
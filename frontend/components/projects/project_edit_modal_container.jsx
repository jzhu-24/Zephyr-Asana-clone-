import { connect } from 'react-redux';
import ProjectEditModal from './project_edit_modal';
import { updateProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';

const mapDispatchToProps = dispatch => ({
  updateProject: workspaceId => dispatch(updateProject(workspaceId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(ProjectEditModal);

import { connect } from 'react-redux';
import ProjectCreateModal from './project_create_modal';
import { createProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = ownProps => {

}

const mapDispatchToProps = dispatch => ({
  createProject: workspaceId => dispatch(createProject(workspaceId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateModal);

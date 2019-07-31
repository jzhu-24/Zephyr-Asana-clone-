import { connect } from 'react-redux';
import ProjectCreateForm from './project_create_form';
import { createProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = ownProps => {

}

const mapDispatchToProps = dispatch => ({
  createProject: workspaceId => dispatch(createProject(workspaceId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);

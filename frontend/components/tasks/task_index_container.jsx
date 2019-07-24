import { connect } from 'react-redux';
import TaskIndex from './task_index';
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.entities.tasks,
  };
};

const mapDispatchToProps = dispatch => ({
  editTask: () => dispatch(openModal("editTask"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskIndex);
import { connect } from 'react-redux';
import TaskIndex from './task_index';
import { openModal } from '../../actions/modal_actions';
import { deleteTask, updateTask } from '../../actions/task_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.entities.tasks,
  };
};

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: task => dispatch(deleteTask(task)),
  editTask: () => dispatch(openModal('editTask')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskIndex);

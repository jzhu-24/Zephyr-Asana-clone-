import { connect } from 'react-redux';
import { createTask, deleteTask, updateTask } from '../../actions/task_actions';
import { updateColumn } from '../../actions/column_actions';
import TaskEditModal from './task_edit_modal'
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  let task;

  if (Object.keys(state.entities.tasks) === 0) {
    task = [];
  } else {
    task = state.entities.tasks[ownProps.taskId];
  }
  
  return {
    task,
    tasks: state.entities.tasks,
    column: state.entities.columns[ownProps.columnId],
  };
};

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task)),
  createTask: task => dispatch(createTask(task)),
  deleteTask: id => dispatch(deleteTask(id)),
  updateColumn: column => dispatch(updateColumn(column)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskEditModal);

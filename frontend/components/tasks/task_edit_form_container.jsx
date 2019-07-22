import { connect } from 'react-redux';
import {
  requestTask,
  deleteTask,
  updateTask,
} from "../../actions/task_actions";
import { updateColumn } from '../../actions/column_actions';
import TaskEditForm from './task_edit_form'
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state, ownProps) => {
  let task;
  
  if (Object.keys(state.entities.tasks) === 0 ) {
    task = [];
  } else {
    task = state.entities.tasks[ownProps.taskId] 
  }

  return {
    task
  }
};

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: id => dispatch(deleteTask(id)),
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEditForm);
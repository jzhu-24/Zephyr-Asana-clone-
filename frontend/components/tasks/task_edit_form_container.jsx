import { connect } from 'react-redux';
import {
  requestTask,
  deleteTask,
  updateTask,
} from "../../actions/task_actions";
import { updateColumn } from '../../actions/column_actions';
import TaskEditForm from './task_edit_form'

const mapStateToProps = (state) => ({
  task: Object.values(state.entities.tasks),
});

const mapDispatchToProps = dispatch => ({
  updateColumn: column_id => dispatch(updateColumn(column_id)),
  requestTask: id => dispatch(requestTask(id)),
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: id => dispatch(deleteTask(id)),
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEditForm);
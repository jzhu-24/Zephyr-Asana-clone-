import { connect } from 'react-redux';
import TaskIndex from './task_index';
import {
  requestTask,
  requestTasks,
  deleteTask,
  updateTask,
  createTask
} from '../../actions/task_actions';

const mapStateToProps = (state, ownProps) => {
  const currentColumnId = ownProps.column.id;
  
  return {
    currentColumn: state.entities.columns[currentColumnId],
    tasks: Object.values(state.entities.tasks),
    tasksArray: ownProps.column.task
  };
};

const mapDispatchToProps = dispatch => ({
  requestTasks: column_id => dispatch(requestTasks(column_id)),
  requestTask: id => dispatch(requestTask(id)),
  createTask: (column_id, task) =>
    dispatch(createTask((column_id, task))),
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: id => dispatch(deleteTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskIndex);
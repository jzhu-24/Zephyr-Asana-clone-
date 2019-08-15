import { connect } from 'react-redux';
import TaskIndexItem from './task_index_item';
import {
  requestTask,
  requestTasks,
  deleteTask,
  updateTask,
  createTask
} from '../../actions/task_actions';
import { openModal } from "../../actions/modal_actions";


const mapStateToProps = (state, ownProps) => {

  return {
    
  };
};

const mapDispatchToProps = dispatch => ({
  requestTasks: column_id => dispatch(requestTasks(column_id)),
  requestTask: id => dispatch(requestTask(id)),
  createTask: (column_id, task) => dispatch(createTask((column_id, task))),
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: id => dispatch(deleteTask(id)),
});

export default connect(
  mapStateToProps,
  null
)(TaskIndexItem);
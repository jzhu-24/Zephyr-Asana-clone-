import { connect } from 'react-redux';
import { createTask } from '../../actions/task_actions';
import { updateColumn } from '../../actions/column_actions';
import TaskCreateForm from './task_create_form';

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  updateColumn: column_id => dispatch(updateColumn(column_id))
});

export default connect(
  null,
  mapDispatchToProps
)(TaskCreateForm);
import { connect } from 'react-redux';
import ColumnIndex from './column_index';
import {
  requestColumn,
  requestColumns,
  deleteColumn,
  updateColumn,
  createColumn
} from '../../actions/column_actions';

import { requestProject, updateProject } from '../../actions/project_actions';
import { updateTask, requestTasks } from "../../actions/task_actions";

const mapStateToProps = (state, ownProps) => {  
  const projectId = ownProps.match.params.projectId;
  let columnsArray;

  if (!state.entities.projects[projectId]) {
    columnsArray = [];
  } else {
    columnsArray = state.entities.projects[projectId].column;
  }

  return {
    columns: state.entities.columns,
    projects: state.entities.projects,
    tasks: state.entities.tasks,
    project: state.entities.projects[projectId],
    columnsArray
  };
};

const mapDispatchToProps = dispatch => ({
  requestColumns: project_id => dispatch(requestColumns(project_id)),
  requestColumn: id => dispatch(requestColumn(id)),
  createColumn: column => dispatch(createColumn(column)),
  updateColumn: column => dispatch(updateColumn(column)),
  deleteColumn: id => dispatch(deleteColumn(id)),
  requestProject: id => dispatch(requestProject(id)),
  requestTasks: columnId => dispatch(requestTasks(columnId)),
  updateProject: project => dispatch(updateProject(project)),
  updateTask: task => dispatch(updateTask(task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnIndex);
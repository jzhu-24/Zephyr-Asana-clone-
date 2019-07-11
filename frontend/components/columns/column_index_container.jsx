import { connect } from 'react-redux';
import ColumnIndex from './column_index';
import {
  requestColumn,
  requestColumns,
  deleteColumn,
  updateColumn,
  createColumn
} from '../../actions/column_actions';

import { requestProject } from '../../actions/project_actions';

const mapStateToProps = (state, ownProps) => {
  const currentProjectId = ownProps.match.params.projectId;
  
  // better way to handle undfined?
  let columnsArray
  if (state.entities.projects[currentProjectId] === undefined) {
    columnsArray = []
  } else {
    columnsArray = state.entities.projects[currentProjectId].column
  };

  return {
    currentProject: state.entities.projects[currentProjectId],
    columns: state.entities.columns,
    columnsArray: columnsArray
  };
};

const mapDispatchToProps = dispatch => ({
  requestColumns: project_id => dispatch(requestColumns(project_id)),
  requestColumn: id => dispatch(requestColumn(id)),
  createColumn: (project_id, column) =>
    dispatch(createColumn((project_id, column))),
  updateColumn: column => dispatch(updateColumn(column)),
  deleteColumn: id => dispatch(deleteColumn(id)),
  requestProject: id => dispatch(requestProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnIndex);
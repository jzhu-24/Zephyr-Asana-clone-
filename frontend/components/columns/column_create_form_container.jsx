import { connect } from 'react-redux';
import { createColumn, fetchColumns } from "../../actions/column_actions";
import { updateProject } from "../../actions/project_actions";
import ColumnForm from './column_form';


const mapStateToProps = (state, ownProps) => {
  const column = { name: '', project_id: ownProps.match.params.projectId }  
  return { column }
}

const mapDispatchToProps = dispatch => ({
  action: (column) => dispatch(createColumn(column)),
  fetchColumns: project_id => dispatch(fetchColumns(project_id)),
  updateProject: project => dispatch(updateProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnForm);
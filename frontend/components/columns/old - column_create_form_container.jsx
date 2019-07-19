import { connect } from 'react-redux';
import { createColumn } from "../../actions/column_actions";
import { updateProject } from "../../actions/project_actions";
import ColumnCreateForm from './column_create_form';


const mapStateToProps = (state, ownProps) => {
  const column = { name: '', project_id: ownProps.match.params.projectId }  
  return { column }
}

const mapDispatchToProps = dispatch => ({
  createColumn: column => dispatch(createColumn(column)),
  updateProject: project => dispatch(updateProject(project))
});

export default connect(
  null,
  mapDispatchToProps
)(ColumnCreateForm);
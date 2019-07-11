import { connect } from "react-redux";
import { updateColumn } from "../../actions/column_actions";

const mapStateToProps = (state, ownProps) => {
  const column = state.columns[ownProps.match.params.columnId];
  return { column };
};

const mapDispatchToProps = dispatch => ({
  action: column => dispatch(updateColumn(column))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceCreateForm);

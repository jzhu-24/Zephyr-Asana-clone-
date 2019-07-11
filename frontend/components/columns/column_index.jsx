import React from "react";
import { Link, withRouter } from "react-router-dom";
import ColumnIndexItem from "./column_index_item";
import CreateColumnContainer from "./column_create_form_container";

class ColumnIndex extends React.Component {
  
  componentDidMount() {
    this.props.requestColumns(this.props.match.params.projectId);
    this.props.requestProject(this.props.match.params.projectId);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.currentProject.column !== this.props.currentProject.column) {
    //   this.props.requestProject(this.props.match.params.projectId);
    // }
  }

  render() {
    const columns = this.props.columnsArray.map(columnId => {
      return (
        <ColumnIndexItem
          key={columnId}
          column={this.props.columns[columnId]} />
      );
    });

    return (
      <div className="column-index">
        {columns}
        <CreateColumnContainer
          match={this.props.match}
          currentProject={this.props.currentProject}
        />
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

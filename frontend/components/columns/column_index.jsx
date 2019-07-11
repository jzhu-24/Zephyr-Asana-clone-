import React from "react";
import { Link, withRouter } from "react-router-dom";
import ColumnIndexItem from "./column_index_item";
import ColumnCreateContainer from "./column_create_form_container";
import { DragDropContext } from "react-beautiful-dnd";

class ColumnIndex extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      project: this.props.project,
      columnsArray: this.props.columnsArray,
      columns: this.columns
    };
  }

  componentDidMount() {
    this.props.requestProject(this.props.match.params.projectId).then(() => this.forceUpdate());
    this.props.requestColumns(this.props.match.params.projectId).then(() => this.forceUpdate());
  }

  onDragEnd = result => {
    
  };

  render() {
    if (this.props.columnsArray.length === 0) return null;
    if (Object.keys(this.props.columns).length === 0) return null;

    return (
      <div>
        <div className="column-index">
          <DragDropContext onDragEnd={this.onDragEnd}>
              {this.props.columnsArray.map(columnId => (
                <ColumnIndexItem
                  updateColumn={this.props.updateColumn}
                  key={columnId}
                  column={this.props.columns[columnId]}
                  requestColumn={this.props.requestColumn}
                  deleteColumn={this.props.deleteColumn}
                  project={this.props.project}
                />
              ))}
          </DragDropContext>
          <ColumnCreateContainer
            match={this.props.match}
            project={this.props.project}
            />
        </div>
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

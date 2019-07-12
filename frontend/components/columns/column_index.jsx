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

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.requestProject(this.props.match.params.projectId);
    this.props.requestColumns(this.props.match.params.projectId);
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.props.columns[source.droppableId];
    const newTaskIds = column.task;
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };
    debugger
    this.setState(newState).then(() => this.forceUpdate());
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
                updateProject={this.props.updateProject}
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

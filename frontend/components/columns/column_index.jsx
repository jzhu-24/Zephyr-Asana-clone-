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
      columns: this.props.columns
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

    const start = this.props.columns[source.droppableId];
    const finish = this.props.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = start.task;
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        task: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.props.columns,
          [newColumn.id]: newColumn
        }
      };

      // ??? how to make this not flicker?
      this.props.updateColumn(newColumn);
      this.setState(newState);
      return;
    }

    const startTaskIds = start.task;
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      task: startTaskIds
    };

    const finishTaskIds = finish.task;
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      task: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };
    
    this.setState(newState);
    // this.props.updateTask({column_id: finish.id});  
    // Object.values(newState.columns).forEach(column => this.props.updateColumn(column));
  };

  render() {
    if (this.props.columnsArray.length === 0) return null;
    if (Object.keys(this.props.columns).length === 0) return null;

    return (
      <div>
        <div className="column-index">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.columnsArray.map(columnId => (
              <ColumnIndexItem
                updateColumn={this.props.updateColumn}
                key={columnId}
                column={this.state.columns[columnId]}
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

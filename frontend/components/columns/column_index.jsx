import React from "react";
import { Link, withRouter } from "react-router-dom";
import ColumnIndexItemContainer from "./column_index_item_container";
import ColumnCreateContainer from "./column_create_form_container";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
    this.props.requestTasks(1);
  }

  // componentDidUpdate(prevState) {
  //   if (prevState !== this.state) {
  //     this.props
  //       .requestColumns(this.props.match.params.projectId)
  //       .then(() => this.forceUpdate());
  //   }
  // }

  // componentWillUnmount() {
    // if (Object.keys(this.state.columns).length !== 0) {
    //   const columns = this.state.columns;
    //   this.state.columnsArray.forEach(columnId => {
    //     let columnTask = columns[columnId].task;
    //     this.props.updateColumn({id: columnId, task: columnTask})
    //     // columnTask.forEach(taskId => {
    //     //   this.props.updateTask({id: taskId, column_id: columnId})
    //     // })
    //   });
    // }
  // }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = this.props.columnsArray;
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newProject = this.props.project;
      newProject.column = newColumnOrder;
      this.setState(Object.assign(this.state, {columnsArray: newColumnOrder}));
      this.props.updateProject(newProject);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = start.task;
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        task: newTaskIds
      };

      let that = this;

      const newState = {
        ...this.state,
        columns: {
          ...that.state.columns,
          [newColumn.id]: newColumn
        }
      };

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
        [newFinish.id]: newFinish
      }
    };
  
    this.setState(newState);

    this.props.updateTask({
      id: draggableId,
      column_id: destination.droppableId
    });
    Object.values(this.state.columns).forEach(column => {
      this.props.updateColumn(column);
    });
    // this.forceUpdate();
    return;
  };

  render() {
    if (this.props.columnsArray.length === 0) return null;
    if (Object.keys(this.props.columns).length === 0) return null;
    if (this.state.columnsArray.length === 0) return null;
    if (Object.keys(this.state.columns).length === 0) return null;

    return (
      <div>
        <div className="column-index">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizotal"
              type="column"
            >
              {provided => (
                <div
                  className="index-droppable"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.state.columnsArray.map((columnId, index) => (
                    <ColumnIndexItemContainer
                      updateColumn={this.props.updateColumn}
                      key={columnId}
                      column={this.props.columns[columnId]}
                      columns={this.props.columns}
                      requestColumn={this.props.requestColumn}
                      updateProject={this.props.updateProject}
                      deleteColumn={this.props.deleteColumn}
                      project={this.props.project}
                      index={index}
                      tasks={this.props.tasks}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <ColumnCreateContainer
            match={this.props.match}
            project={this.props.project}
            column={this.props.column}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

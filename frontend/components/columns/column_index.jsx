import React from "react";
import { Link, withRouter } from "react-router-dom";
import ColumnIndexItem from './column_index_item'
import ColumnCreateContainer from "./column_create_form_container";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class ColumnIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {},
      columnsArray: [],
      columns: {},
      tasks: {},
      displayEditForm: {}
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    this.toggleEditColumn = this.toggleEditColumn.bind(this);
    this.handleEditColumn = this.handleEditColumn.bind(this);
    this.handleEditColumnSubmit = this.handleEditColumnSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .requestProject(this.props.match.params.projectId)
      .then(result => {
        this.setState({ project: result.project });
        this.setState({ columnsArray: result.project.column });

        // initialize displayEditForm
        const displayEditForm = {}
        for (const columnId of result.project.column) {
          displayEditForm[columnId] = false;
        }
        this.setState({ displayEditForm });
      });

    this.props
      .requestColumns(this.props.match.params.projectId)
      .then(result => {
        this.setState({ columns: result.columns });
        this.props
          .requestTasks(Object.keys(result.columns)[0])
          .then(result => this.setState({ tasks: result.tasks }));
      });
  }

  handleDeleteColumn(columnId) {
    const updatedProject = this.state.project;
    const index = updatedProject.column.indexOf(columnId);
    updatedProject.column.splice(index, 1);

    this.setState({ project: updatedProject }, () => {
      this.props.updateProject(updatedProject).then(() => {
        this.props.deleteColumn(columnId);
      });
    });
  }

  // ??? copy -> modify -> setState
  toggleEditColumn(columnId) {
    const displayEditForm = this.state.displayEditForm;
    displayEditForm[columnId] = !this.state.displayEditForm[columnId];
    this.setState({displayEditForm});
  }

  handleEditColumn(columnId) {
    return e => {
      this.setState({
        ...this.state,
        columns: {
          ...this.state.columns,
          [columnId]: {
            ...this.state.columns[columnId],
            name: e.target.value
          }
        }
      });
    };
  }

  handleEditColumnSubmit(columnId) {
    this.toggleEditColumn(columnId);
    debugger
    this.props.updateColumn(this.state.columns[columnId]);
  }

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
      const newColumnOrder = this.state.columnsArray;
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newProject = this.state.project;
      newProject.column = newColumnOrder;
      this.setState(
        Object.assign(this.state, { columnsArray: newColumnOrder })
      );
      this.state.updateProject(newProject);
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

    return;
  };

  render() {
    if (Object.keys(this.state.tasks).length === 0) return null;

    console.log(this.state.columns);
    
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
                    <ColumnIndexItem
                      key={columnId}
                      {...this.state}
                      columnId={columnId}
                      column={this.state.columns[columnId]}
                      handleDeleteColumn={this.handleDeleteColumn}
                      toggleEditColumn={this.toggleEditColumn}
                      handleEditColumn={this.handleEditColumn}
                      handleEditColumnSubmit={this.handleEditColumnSubmit}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <ColumnCreateContainer
            match={this.props.match}
            project={this.state.project}
            column={this.state.columns[Object.keys(this.state.columns)[0]]}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import ColumnIndexItem from "./column_index_item";
import ColumnCreateForm from "./column_create_form";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class ColumnIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {},
      columnsArray: [],
      columns: {},
      tasks: {},
      displayEditColumnForm: {},
      displayCreateColumnForm: false,
      displayCreateTaskForm: {},
      newColumn: { project_id: this.props.match.params.projectId },
      newTasks: {}
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initialLoad = this.initialLoad.bind(this);
  }

  componentDidMount() {
    this.initialLoad();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.projectId !== this.props.match.params.projectId) {
      this.initialLoad();
    }
  }

  initialLoad() {
    this.props
      .requestProject(this.props.match.params.projectId)
      .then(result => {
        const newTasks = this.state.newTasks;
        const displayEditColumnForm = {};

        for (const columnId of result.project.column) {
          newTasks[columnId] = { column_id: columnId };
          displayEditColumnForm[columnId] = false;
        }

        this.setState({
          project: result.project,
          displayEditColumnForm,
          newTasks,
          columnsArray: result.project.column
        });
      });
    
    this.props
      .requestColumns(this.props.match.params.projectId)
      .then(result => {
        this.setState({ columns: result.columns });
        if (Object.keys(result.columns).length !== 0) {
          this.props
            .requestTasks(Object.keys(result.columns)[0])
            .then(result => this.setState({ tasks: result.tasks }));
        }
      });
  }

  handleDeleteColumn(columnId) {
    const updatedProject = this.state.project;
    const index = updatedProject.column.indexOf(columnId);
    updatedProject.column.splice(index, 1);

    this.setState(
      {
        project: updatedProject,
        columnsArray: updatedProject.column
      },
      () => {
        this.props.deleteColumn(columnId);
        this.props.updateProject(updatedProject);
      }
    );
  }

  handleDeleteTask(task, e) {
    e.stopPropagation();
    const { deleteTask, updateColumn } = this.props;
    const { columns } = this.state;

    const updatedColumn  = columns[task.column_id];
    const updatedColumns = columns;

    const index = updatedColumn.task.indexOf(task.id);
    updatedColumn.task.splice(index, 1);
    updatedColumns[task.column_id] = updatedColumn;

    this.setState({ columns: updatedColumns }, () => {
        updateColumn(updatedColumn);
        deleteTask(task.id);
      }
    );
  }

  toggleForm(type, columnId) {
    if (type === "EDIT_COLUMN") {
      const displayEditColumnForm = this.state.displayEditColumnForm;
      displayEditColumnForm[columnId] = !this.state.displayEditColumnForm[
        columnId
      ];
      this.setState({ displayEditColumnForm });
    } else if (type === "CREATE_COLUMN") {
      this.setState({
        displayCreateColumnForm: !this.state.displayCreateColumnForm
      });
    } else if (type === "CREATE_TASK") {
      const displayCreateTaskForm = this.state.displayCreateTaskForm;
      displayCreateTaskForm[columnId] = !this.state.displayCreateTaskForm[
        columnId
      ];
      this.setState({ displayCreateTaskForm });
    }
  }

  handleInput(type, columnId) {
    let that = this;

    return e => {
      if (type === "EDIT_COLUMN") {
        const modifiedColumns = that.state.columns;
        modifiedColumns[columnId].name = e.target.value;
        that.setState({ columns: modifiedColumns });
      } else if (type === "CREATE_COLUMN") {
        const modifiedNewColumn = that.state.newColumn;
        modifiedNewColumn.name = e.target.value;
        that.setState({ newColumn: modifiedNewColumn });
      } else if (type === "CREATE_TASK") {
        const modifiedNewTasks = that.state.newTasks;
        modifiedNewTasks[columnId].name = e.target.value;
        that.setState({ newTasks: modifiedNewTasks });
      }
    };
  }

  handleSubmit(type, columnId) {
    if (type === "EDIT_COLUMN") {
      this.toggleForm("EDIT_COLUMN", columnId);
      this.props.updateColumn(this.state.columns[columnId]);
    } else if (type === "CREATE_COLUMN") {
      this.toggleForm("CREATE_COLUMN");

      if (this.state.newColumn.name && this.state.newColumn.name !== "") {
        this.props.createColumn(this.state.newColumn).then(result => {
          // update columns state
          const updatedColumns = this.state.columns;
          updatedColumns[result.column.id] = result.column;

          // update project state + backend
          const updatedProject = this.state.project;
          updatedProject.column.push(result.column.id);
          this.props.updateProject(updatedProject);

          const newTasks = Object.assign(this.state.newTasks, {
            [result.column.id]: { column_id: result.column.id }
          });

          this.setState({
            newColumn: {
              name: "",
              project_id: this.state.project.id
            },
            newTasks
          });
        });
      }
    } else if (type === "CREATE_TASK") {
      this.toggleForm("CREATE_TASK", columnId);

      if (
        this.state.newTasks[columnId].name &&
        this.state.newTasks[columnId].name !== ""
      ) {
        this.props.createTask(this.state.newTasks[columnId]).then(result => {
          const columns = this.state.columns;
          columns[columnId].task.unshift(result.task.id);
          const tasks = Object.assign(this.state.tasks, {
            [result.task.id]: result.task
          });
          const newTasks = Object.assign(this.state.newTasks, {
            [columnId]: { column_id: columnId }
          });

          this.setState(
            {
              columns,
              tasks,
              newTasks
            },
            () => this.props.updateColumn(columns[columnId])
          );
        });
      }
    }
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
      newColumnOrder.splice(destination.index, 0, draggableId - 1000000);

      const newProject = this.state.project;
      newProject.column = newColumnOrder;
      this.setState(
        Object.assign(this.state, { columnsArray: newColumnOrder })
      );
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

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.props.updateColumn(newColumn);
      this.setState(newState);
      return;
    }

    const startTaskIds = start.task;
    startTaskIds.splice(source.index, 1);
    if (!startTaskIds) startTaskIds = [];

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

    this.setState(newState, () => {
      this.props.updateTask({
        id: draggableId,
        column_id: destination.droppableId
      });
      Object.values(this.state.columns).forEach(column => {
        this.props.updateColumn(column);
      });
    });
  };

  render() {
    const { taskId } = this.props.match.params;
    const { editTask, updateTask, tasks } = this.props;
    const { columns, newColumn, displayCreateColumnForm } = this.state;
    
    if (taskId) editTask(taskId);

    return (
      <div className="column-container">
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
                      tasks={tasks}
                      columnId={columnId}
                      column={columns[columnId]}
                      handleDeleteColumn={this.handleDeleteColumn}
                      toggleForm={this.toggleForm}
                      handleInput={this.handleInput}
                      handleSubmit={this.handleSubmit}
                      editTask={editTask}
                      updateTask={updateTask}
                      handleDeleteTask={this.handleDeleteTask}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <ColumnCreateForm
            newColumn={newColumn}
            toggleForm={this.toggleForm}
            displayCreateColumnForm={displayCreateColumnForm}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

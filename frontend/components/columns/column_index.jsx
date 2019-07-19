import React from "react";
import { Link, withRouter } from "react-router-dom";
import ColumnIndexItem from './column_index_item'
import ColumnCreateForm from './column_create_form'
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
    this.toggleForm = this.toggleForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .requestProject(this.props.match.params.projectId)
      .then(result => {
        const newTasks = this.state.newTasks;
        const displayEditColumnForm = {};

        for (const columnId of result.project.column) {
          newTasks[columnId] = { column_id: columnId }
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
        this.props.requestTasks(Object.keys(result.columns)[0])
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

  toggleForm(type, columnId) {
    if (type === 'EDIT_COLUMN') {
      const displayEditColumnForm = this.state.displayEditColumnForm;
      displayEditColumnForm[columnId] = !this.state.displayEditColumnForm[columnId];
      this.setState({ displayEditColumnForm });
    } else if (type === 'CREATE_COLUMN') {
      this.setState({ displayCreateColumnForm: !this.state.displayCreateColumnForm });      
    } else if (type === 'CREATE_TASK') {
      const displayCreateTaskForm = this.state.displayCreateTaskForm;
      displayCreateTaskForm[columnId] = !this.state.displayCreateTaskForm[columnId];
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
    if (type === 'EDIT_COLUMN') {
      this.toggleForm('EDIT_COLUMN', columnId);
      this.props.updateColumn(this.state.columns[columnId]);
    } else if (type === 'CREATE_COLUMN' && this.state.newColumn.name !== '') {
      this.toggleForm('CREATE_COLUMN');
      this.props.createColumn(this.state.newColumn).then(result => {        
        // update columns state
        const updatedColumns = this.state.columns;
        updatedColumns[result.column.id] = result.column;

        // update project state + backend
        const updatedProject = this.state.project;
        updatedProject.column.push(result.column.id)
        this.props.updateProject(updatedProject);

        this.setState({
          // columns: updatedColumns,
          // project: updatedProject,
          newColumn: {
            name: '',
            project_id: this.state.project.id
          }
        });
      })
    } else if (type === 'CREATE_TASK' && this.state.newTasks[columnId].name !== '') {
      this.toggleForm("CREATE_TASK", columnId);
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
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newProject = this.state.project;
      newProject.column = newColumnOrder;
      this.setState(
        Object.assign(this.state, { columnsArray: newColumnOrder })
      );
      console.log(newProject);
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

    return;
  };

  render() {
    if (Object.keys(this.state.newTasks).length === 0) return null;
    if (Object.keys(this.state.columns).length === 0) return null;
    if (Object.keys(this.state.tasks).length === 0) return null;

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
                      toggleForm={this.toggleForm}
                      handleInput={this.handleInput}
                      handleSubmit={this.handleSubmit}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <ColumnCreateForm
            newColumn={this.state.newColumn}
            toggleForm={this.toggleForm}
            displayCreateColumnForm={this.state.displayCreateColumnForm}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

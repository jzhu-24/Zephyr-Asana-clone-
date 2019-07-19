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
      displayEditForm: {},
      displayCreateForm: false,
      newColumn: { project_id: this.props.match.params.projectId }
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    this.toggleColumnForm = this.toggleColumnForm.bind(this);
    this.handleColumnInput = this.handleColumnInput.bind(this);
    this.handleColumnSubmit = this.handleColumnSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .requestProject(this.props.match.params.projectId)
      .then(result => {
        this.setState({ project: result.project });
        this.setState({ columnsArray: result.project.column });

        // initialize displayEditForm
        const displayEditForm = {};
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
  toggleColumnForm(type, columnId) {
    if (type === 'EDIT') {
      const displayEditForm = this.state.displayEditForm;
      displayEditForm[columnId] = !this.state.displayEditForm[columnId];
      this.setState({ displayEditForm });
    } else if (type === 'CREATE') {
      const displayCreateForm = !this.state.displayCreateForm;
      this.setState({ displayCreateForm });      
    }
  }

  handleColumnInput(type, columnId) {
    return e => {
      if (type === 'EDIT') {
        const modifiedColumns = this.state.columns;
        modifiedColumns[columnId].name = e.target.value;
        this.setState({ columns: modifiedColumns });
      } else if (type === 'CREATE') {
        const modifiedNewColumn = this.state.newColumn;
        modifiedNewColumn.name = e.target.value;
        this.setState({ newColumn: modifiedNewColumn });        
      }
    };
  }

  handleColumnSubmit(type, columnId) {
    if (type === 'EDIT') {
      this.toggleColumnForm('EDIT', columnId);
      this.props.updateColumn(this.state.columns[columnId]);
    } else if (type === 'CREATE' && this.state.newColumn.name !== '') {
      this.toggleColumnForm('CREATE');
      this.props.createColumn(this.state.newColumn).then(result => {        
        // update columns state
        const updatedColumns = this.state.columns;
        updatedColumns[result.column.id] = result.column;

        // update project state + backend
        const updatedProject = this.state.project;
        updatedProject.column.push(result.column.id)
        this.props.updateProject(updatedProject);

        this.setState({
          columns: updatedColumns,
          project: updatedProject,
          newColumn: {
            name: '',
            project_id: this.state.project.id
          }
        });
      })
    }
    // FETCH COLUMNS?
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
                      toggleColumnForm={this.toggleColumnForm}
                      handleColumnInput={this.handleColumnInput}
                      handleColumnSubmit={this.handleColumnSubmit}
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
            toggleColumnForm={this.toggleColumnForm}
            displayCreateForm={this.state.displayCreateForm}
            handleColumnInput={this.handleColumnInput}
            handleColumnSubmit={this.handleColumnSubmit}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ColumnIndex);

import React from "react";
import TaskIndexContainer from "../tasks/task_index_container";
import TaskCreateFormContainer from "../tasks/task_create_form_container";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable, Draggable } from "react-beautiful-dnd";

class ColumnIndexItem extends React.Component {
  constructor(props) {
    super(props);
    const name = this.props.column.name

    this.state = {
      column: { name },
      displayEditForm: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.columns !== this.props.columns) {
  //     this.setState(this.state, () => this.forceUpdate());
  //     this.forceUpdate();
  //   }
  // }

  toggleInput() {
    this.setState({displayEditForm: !this.state.displayEditForm});
  }

  handleInput(type) {
    return e => {
      this.setState({
        column: {
          [type]: e.target.value
        }
      });
    };
  }

  handleSubmit() {
    const column = {
      name: this.state.column.name,
      id: this.props.column.id,
    }

    this.toggleInput();
    this.props.updateColumn(column).then(() => this.forceUpdate());
  }

  handleDelete() {
    const updatedProject = this.props.project;
    const index = updatedProject.column.indexOf(this.props.column.id);

    this.props
      .deleteColumn(this.props.column.id)
      .then(() => {
        updatedProject.column.splice(index, 1);
        this.props.updateProject(updatedProject);
      })
      .then(() => this.setState(this.state));
  }

  render() {
    let editForm;

    if (this.state.displayEditForm === false) {
      editForm = (
        <p className="column-name" onClick={this.toggleInput}>
          {this.props.column.name}
        </p>
      );
    } else {
      editForm = (
        <form>
          <input
            className="edit-column-input"
            type="text"
            value={this.state.column.name}
            onChange={this.handleInput("name")}
            onSubmit={this.handleSubmit}
            onBlur={this.handleSubmit}
            autoFocus
          />
        </form>
      );
    }

    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <div
            className="column-draggable"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="column">
              <div className="column-header" {...provided.dragHandleProps}>
                {editForm}
                <FontAwesomeIcon
                  className="column-delete-button"
                  icon={faTrash}
                  onClick={this.handleDelete}
                />
              </div>
              <TaskCreateFormContainer column={this.props.column} />

              <Droppable droppableId={this.props.column.id} type="task">
                {provided => (
                  <div
                    className="column-droppable"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TaskIndexContainer
                      column={this.props.column}
                      tasks={this.props.tasks}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ColumnIndexItem;

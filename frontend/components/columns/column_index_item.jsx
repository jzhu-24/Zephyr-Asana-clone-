import React from "react";
import TaskIndexContainer from "../tasks/task_index_container";
import TaskCreateFormContain   from "../tasks/task_create_form_container";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";

class ColumnIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      column: this.props.column,
      displayEditForm: false
    };

    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  componentDidUpdate() {
    if (this.state.displayEditForm) this.handleForm();
  }

  toggleInput() {
    this.setState({ displayEditForm: !this.state.displayEditForm });
  }

  handleInput(type) {
    return e => {
      this.setState({
        column: {
          [type]: e.target.value,
          id: this.props.column.id
        }
      });
    };
  }

  handleForm() {
    const input = document.getElementsByClassName("edit-column-input")[0];
    let that = this;

    window.onclick = e => {
      if (e.target.classList.value === "column-name") {
        return null;
      } else if (e.target == input) {
        return null;
      } else {
        this.setState({
          displayEditForm: !this.state.displayEditForm
        });
        that.handleSubmit();
      }
    };
  }

  handleSubmit() {
    this.props.updateColumn(this.state.column);
  }

  handleDelete() {
    const updatedProject = this.props.project;
    const index = updatedProject.indexOf(this.state.column.id)

    this.props.deleteColumn(this.state.column.id).then(() => {
      updatedProject.splice(index, 1);
      this.props.updateProject(updatedProject);
    });
  }

  render() {
    if (this.props.column === undefined) return null;
    if (this.state.column === undefined) return null;

    let editForm;

    if (this.state.displayEditForm === false) {
      editForm = (
        <p className="column-name" onClick={this.toggleInput}>
          {this.state.column.name}
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
          />
        </form>
      );
    }

    return (
      <div className="column">
        <div className="column-header">
          {editForm}
          <FontAwesomeIcon
            className="column-delete-button"
            icon={faTrash}
            onClick={this.handleDelete}
          />
        </div>
        <TaskCreateFormContain column={this.state.column} />

        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskIndexContainer column={this.props.column}>
                <div>{provided.placeholder}</div>
              </TaskIndexContainer>
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default ColumnIndexItem;

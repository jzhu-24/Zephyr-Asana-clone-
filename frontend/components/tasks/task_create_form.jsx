import React from "react";
import { Link, withRouter } from "react-router-dom";

class TaskCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: { name: "" },
      displayForm: false
    };

    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  componentDidUpdate() {
    if (this.state.displayForm) this.handleForm();
  }

  toggleInput() {
    this.setState({ displayForm: !this.state.displayForm })
  }

  handleInput(type) {
    return e => {
      this.setState({
        task: {
          [type]: e.target.value
        }
      });
    };
  }

  handleForm() {
    const input = document.getElementsByClassName("create-task")[0];
    let that = this;
    window.onclick = e => {
      if (e.target.classList.value === "create-task-input") {
        return null;
      } else if (e.target == input) {
        return null;
      } else {
        this.setState({
          displayForm: !this.state.displayForm
        });
        that.handleSubmit();
      }
    };
  }

  handleSubmit() {
    const task = {
      name: this.state.task.name,
      column_id: this.props.column.id
    };
    this.setState({ task });

    const updatedColumn = this.props.column;
    this.props.createTask(this.state.task).then(result => {
      updatedColumn.task.unshift(result.task.id);
      this.props.updateColumn(updatedColumn);
    });
  }

  render() {
    let createForm;

    if (this.state.displayForm === true) {
      createForm = (
        <form>
          <textarea
            className="create-task-input"
            type="text"
            value={this.state.task.name}
            onChange={this.handleInput("name")}
            onSubmit={this.handleSubmit}
          />
        </form>
      );
    }

    return (
      <div>
        <div className="create-task" onClick={this.toggleInput}>
          +
        </div>
        {createForm}
      </div>
    );
  }
}

export default withRouter(TaskCreateForm);

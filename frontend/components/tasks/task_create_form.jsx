import React from "react";
import { Link, withRouter } from "react-router-dom";

class TaskCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: { name: "" },
      displayForm: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
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

  handleSubmit() {
    this.toggleInput();

    const task = {
      name: this.state.task.name,
      column_id: this.props.column.id
    };
    this.setState({ task });

    const updatedColumn = this.props.column;
    this.props
      .createTask(task)
      .then(result => {
        updatedColumn.task.unshift(result.task.id);
        this.props.updateColumn(updatedColumn);
      })
      .then(() => this.forceUpdate());
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
            onBlur={this.handleSubmit}
            autoFocus
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

import React from "react";
import { Link, withRouter } from "react-router-dom";

class TaskCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.enterPressed = this.enterPressed.bind(this);
  }

  enterPressed = e => {
    if (e.charCode === 13) {
      this.props.handleSubmit("CREATE_TASK");
    }
  };

  render() {
    const {
      columnId,
      newTasks,
      toggleForm,
      displayCreateTaskForm,
      handleInput,
      handleSubmit
    } = this.props;

    let createForm;

    if (displayCreateTaskForm) {
      createForm = (
        <form onSubmit={() => handleSubmit("CREATE_TASK", columnId)}>
          <input
            className="create-task-input"
            type="text"
            value={newTasks[columnId].name}
            onChange={handleInput("CREATE_TASK", columnId)}
            onBlur={() => handleSubmit("CREATE_TASK", columnId)}
            autoFocus
          />
        </form>
      );
    }

    return (
      <div>
        <div
          className="create-task"
          onClick={() => toggleForm("CREATE_TASK", columnId)}
        >
          +
        </div>
        {createForm}
      </div>
    );
  }
}

export default withRouter(TaskCreateForm);

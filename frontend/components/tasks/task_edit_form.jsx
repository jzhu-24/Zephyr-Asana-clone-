import React from "react";
import { Link, withRouter } from "react-router-dom";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from 'react-calendar';

class TaskEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false,
      task: {
        ...this.props.task
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalEsc = this.closeModalEsc.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.toggleShowCalendar = this.toggleShowCalendar.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentDidMount() {
    this.closeModalEsc();
  }

  enterPressed = e => {
    if (e.charCode === 13) {
      this.props.handleSubmit();
    }
  };

  handleInput(type) {
    return e => {
      const task = this.state.task;
      task[type] = e.target.value;

      this.setState({ task }, () => {
        this.handleSubmit();
      });
    };
  }

  selectDate = date => {
    const task = this.state.task;
    task[due_date] = date;

    this.setState(task, () => {
      this.handleSubmit();
    })
  }

  handleSubmit() {
    this.props.updateTask(this.state.task);
  }

  closeModalEsc() {
    $(document).keydown(e => {
      if (e.keyCode == 27) {
        this.props.closeModal();
      }
    });
  }

  closeModal() {
    const workspaceId = this.props.match.params.workspaceId;
    const projectId = this.props.match.params.projectId;
    this.props.history.push(`/${workspaceId}/${projectId}`);
    this.props.closeModal();
  }

  toggleCompleted() {
    const task = this.state.task;
    task.completed = !this.state.task.completed;

    this.setState({ task }, () => {
      this.handleSubmit();
    });
  }

  toggleShowCalendar() {
    this.setState({ showCalendar: !this.state.showCalendar })
  }

  render() {
    const { closeModal } = this.props;
    let completed;

    if (this.state.task.completed === false) {
      completed = (
        <button
          className="btn task-edit-incomplete"
          onClick={this.toggleCompleted}
        >
          <FontAwesomeIcon icon={faCheck} className="task-edit-check" />
          <div className="task-edit-mark-complete">Mark Complete</div>
        </button>
      );
    } else {
      completed = (
        <button
          className="btn task-edit-complete"
          onClick={this.toggleCompleted}
        >
          <FontAwesomeIcon icon={faCheck} className="task-edit-check" />
          <div className="task-edit-completed">Completed</div>
        </button>
      );
    }

    return (
      <div className="task-edit-form">
        <div className="task-edit-top">
          {completed}
          <div onClick={closeModal} className="task-edit-cross">
            ×
          </div>
        </div>
        <div className="task-edit-header">
          <input
            className="task-edit-name"
            type="text"
            value={this.state.task.name}
            placeholder="Write a task name"
            onChange={this.handleInput("name")}
            onBlur={() => this.handleSubmit()}
            onKeyPress={this.enterPressed}
          />
          <div className="task-edit-header-sub">
            <div>Assigned To</div>
            <div onClick={this.toggleShowCalendar}>Due Date {this.state.task.due_date}
              {this.state.showCalendar ? <Calendar onChange={this.selectDate} value={this.state.task.due_date} className='calendar'/> : null }
            </div>
          </div>
        </div>
        <div className="task-edit-border" />
        <div className="task-edit-description-container">
          <FontAwesomeIcon
            icon={faGripLines}
            className="task-edit-description-icon"
          />
          <textarea
            className="task-edit-description"
            type="text"
            value={this.state.task.description || ""}
            onChange={this.handleInput("description")}
            onBlur={() => this.handleSubmit()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(TaskEditForm);

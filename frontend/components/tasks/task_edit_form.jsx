import React from "react";
import { Link, withRouter } from "react-router-dom";

class TaskEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      owner_id: '',
      completed: '',
      due_date: ''
    }
  }

  componentDidMount() {
    this.props.requestTask(this.props.taskId).then(task => this.setState(task));
    this.closeModalEsc();

  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
    }
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit() {
    this.props
      .updateWorkspace(this.state)
      .then(result => this.props.history.push(`/${result["workspace"].id}`))
      .then(this.props.closeModal);
  }

  closeModalEsc() {
    const closeModal = this.props.closeModal;
    $(document).keydown(function(e) {
      if (e.keyCode == 27) {
        closeModal();
      }
    });
  }

  render() {
    if (this.props.task === undefined) return null;

    return (
      <div className="task-edit-form">
        <div className="task-edit-top">
          <div className="task-edit-mark-complete">Mark Complete</div>
          <div onClick={this.props.closeModal} className="workspace-form-cross">
            ×
          </div>
        </div>
        <input
          type="text"
          value={this.props.task.name}
          onChange={this.handleInput("name")}
        />
        <div>Assigned To</div>
        <div>Due Date</div>
        <textarea
          type="text"
          value={this.props.task.name}
          onChange={this.handleInput("description")}
        />
      </div>
    );
  }
}

export default withRouter(TaskEditForm);

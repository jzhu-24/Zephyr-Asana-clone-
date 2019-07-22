import React from "react";
import { Link, withRouter } from "react-router-dom";

class TaskEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = this.props.task;

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalEsc = this.closeModalEsc.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.closeModalEsc();
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit() {
    this.props.updateTask(this.state);
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

  render() {
    const { closeModal } = this.props;

    return (
      <div className="task-edit-form">
        <div className="task-edit-top">
          <div className="task-edit-mark-complete">Mark Complete</div>
          <div onClick={closeModal} className="workspace-form-cross">
            ×
          </div>
        </div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleInput("name")}
          onBlur={() => this.handleSubmit()}
        />
        <div>Assigned To</div>
        <div>Due Date</div>
        <textarea
          type="text"
          value={this.state.description}
          onChange={this.handleInput("description")}
          onBlur={() => this.handleSubmit()}
        />
      </div>
    );
  }
}

export default withRouter(TaskEditForm);

import React from "react";
import { withRouter } from "react-router-dom";

class ProjectEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.project;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.closeModalEsc();
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { updateProject, closeModal } = this.props;

    updateProject(this.state);
    closeModal();
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
    const { name } = this.state;
    const { closeModal } = this.props;

    return (
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Your Project</h2>
          <div
            onClick={closeModal}
            className="modal-cross"
          >
            ×
          </div>
        </div>
        <form className="form">
          <label>
            <p>Project Name</p>
            <input
              placeholder="Project Name"
              type="text"
              value={name}
              onChange={this.handleInput('name')}
              autoFocus
            />
          </label>
          <button
            onClick={this.handleSubmit}
            className="modal-button"
          >
            Edit Project
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(ProjectEditModal);

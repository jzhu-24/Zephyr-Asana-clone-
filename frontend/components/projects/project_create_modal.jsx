import React from 'react';
import { withRouter } from 'react-router-dom';

class ProjectCreateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      workspace_id: this.props.currentWorkspace.id,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.closeModalEsc();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      this.setState({ name: "Project Name" });
    }
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createProject, closeModal, history } = this.props;

    createProject(this.state).then(result => history.push(`/${result.project.workspace_id}/${result.project.id}`))
      .then(closeModal);
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
          <h2>Create Your Project</h2>
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
            Create Project
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(ProjectCreateModal);

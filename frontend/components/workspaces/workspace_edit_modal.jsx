import React from 'react';
import { withRouter } from 'react-router-dom';

class WorkspaceEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.currentWorkspace;

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
    return (
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Your Workspace</h2>
          <div
            onClick={this.props.closeModal}
            className="modal-cross"
          >
            ×
          </div>
        </div>
        <form className="form">
          <label>
            <p>Workspace Name</p>
            <input
              placeholder="Company or Team Name"
              type="text"
              value={this.state.name}
              onChange={this.handleInput("name")}
              autoFocus
            />
          </label>
          <button
            onClick={this.handleSubmit}
            className="modal-button"
          >
            Edit Workspace
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(WorkspaceEditModal);

import React from 'react';
import { withRouter } from 'react-router-dom';

class WorkspaceEditForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.currentWorkspace.id,
      name: this.props.currentWorkspace.name
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidUpdate() {
  //   this.props.clearErrors();
  // }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateWorkspace(this.state).then(result => {
      debugger
      this.props.history.push(`/${result["workspace"].id}`);
    })
  }

  renderErrors() {
    if (this.props.errors !== undefined) {
      return (
        <ul className="errors">
          {this.props.errors.map((error, i) => (
            <ul key={`error-${i}`}>
              {error}
            </ul>
          ))}
        </ul>
      );
    }
  }

  render() {
    // ??? class naming convention?

    return (
      <div className="edit-workspace-form-modal">
        <div className="workspace-form-container">
          <div className="workspace-form-header">
            <h2>Edit Your Workspace</h2>
            <div className="workspace-form-cross">×</div>
          </div>
          <form className="workspace-form">
            <label>
              <p>Workspace Name</p>
              <input 
                type="text"
                value={this.state.name}
                onChange={this.handleInput('name')} />   
            </label>
            {this.renderErrors()}
            <button onClick={this.handleSubmit} className="workspace-form-button">
              Edit Workspace
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(WorkspaceEditForm);
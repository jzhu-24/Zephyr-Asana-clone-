import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class WorkspaceForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Company or Team Name',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.props.clearErrors();
  // }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createWorkspace(this.state).then(result => {
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
      <div className="create-workspace-form-modal">
        <div className="workspace-form-container">
          <div className="workspace-form-header">
            <h2>Create Your Workspace</h2>
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
              Create Workspace
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(WorkspaceForm);
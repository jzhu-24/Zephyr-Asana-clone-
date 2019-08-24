import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from '../workspaces/workspace_index_item';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.displayInitials = this.displayInitials.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteWorkspace(this.props.match.params.workspaceId).then(() => this.props.history.push('/0')); 
  }

  displayInitials() {
    const currentUser = this.props.users[this.props.currentUser];

    if (currentUser) {
      return (currentUser.first_name[0].toUpperCase() + currentUser.last_name[0].toUpperCase());
    }
  }

  render() {    
    const { workspaces, logout, createForm, editForm } = this.props;
    const { workspaceId } = this.props.match.params;

    if (!workspaces || workspaceId === undefined) return null;

    const workspaceItems = workspaces.map(workspace => {
      return (
        <WorkspaceIndexItem
          key={workspace.id}
          workspace={workspace}
          currentWorkspaceId={workspaceId} />
      );
    });

    const deleteForm = (
      <p onClick={this.handleDelete} className="user-dropdown-row">
        Delete Current Workspace
      </p>
    )

    return (
      <div>
        <div className="user-dropdown">
          <div className="user-dropdown-container">
            <div className="user-dropdown-workspaces">
              {workspaceItems}
            </div>
            <div>
              {createForm}
              {editForm}
              {workspaces.length > 1 && deleteForm}
            </div>
            <div>
              <p onClick={logout} className="user-dropdown-row">Log Out</p>
            </div>
          </div>
          {this.displayInitials()}
        </div>
      </div>
    )
  }
}

export default withRouter(UserDropdown);

import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from '../workspaces/workspace_index_item';

class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.displayInitials = this.displayInitials.bind(this);
  }

  componentDidUpdate() {
    this.closeDropdown();
  }

  toggleDropdown() {
    document.getElementsByClassName('user-dropdown-container')[0].classList.toggle('show');
  }

  // eslint-disable-next-line class-methods-use-this
  closeDropdown() {
    const userDropdown = document.getElementsByClassName('user-dropdown-container')[0];

    window.onclick = (event) => {
      if (!event.target.matches('.user-dropdown-button') && userDropdown.classList.contains('show')) {
        userDropdown.classList.toggle('show');
      }
    }

    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        document.getElementsByClassName('user-dropdown-container')[0].classList.remove('show');
      }
    });
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
        <div className="user-dropdown" >
          <div onClick={this.toggleDropdown} className="user-dropdown-button">{this.displayInitials()}</div>
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
        </div>
      </div>
    )
  }
}

export default withRouter(UserDropdown);

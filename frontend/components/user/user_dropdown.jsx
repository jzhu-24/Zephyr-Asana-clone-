import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from '../workspaces/workspace_index_item';

class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.displayInitials = this.displayInitials.bind(this);
  }

  componentDidMount() {
    this.props.requestWorkspaces();
    this.props.requestUsers();
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
    // ??? how do I ensure state is fully updated before rendering? loading screen? conditional
    if (!this.props.workspaces || this.props.match.params.workspaceId === undefined) return null
    const { logout } = this.props;
     
    const workspaces = this.props.workspaces.map(workspace => {
      return (
        <WorkspaceIndexItem
          key={workspace.id}
          workspace={workspace}
          currentWorkspaceId={this.props.match.params.workspaceId} />
      );
    });

    return (
      <div>
        <div className="user-dropdown" >
          <div onClick={this.toggleDropdown} className="user-dropdown-button">{this.displayInitials()}</div>
          <div className="user-dropdown-container">
            <div className="user-dropdown-workspaces">
              {workspaces}
            </div>
            <div>
              {this.props.createForm}
              {this.props.editForm}
              <p onClick={this.handleDelete} className="user-dropdown-row">
                Delete Current Workspace
              </p>
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
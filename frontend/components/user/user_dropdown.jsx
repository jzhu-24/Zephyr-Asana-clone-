import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from '../workspaces/workspace_index_item';

class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleDropdown() {
    document.getElementsByClassName("user-dropdown-container")[0].classList.toggle("show");
  }

  closeDropdown() {
    const userDropdown = document.getElementsByClassName("user-dropdown-container")[0];

    window.onclick = (event) => {
      if (!event.target.matches('.user-dropdown-button') && userDropdown.classList.contains('show')) {
        userDropdown.classList.toggle("show");
      }
    }

    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        document.getElementsByClassName("user-dropdown-container")[0].classList.remove("show");
      }
    });
  }

  componentDidMount() {
    this.props.requestWorkspaces();
  }

  componentDidUpdate() {
    this.closeDropdown();
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteWorkspace(this.props.match.params.workspaceId).then(() => this.props.history.push('/1')); 
  }

  render() {   
    // ??? how do I ensure state is fully updated before rendering? loading screen? conditional
    if (this.props.workspaces.length === 0 || this.props.match.params.workspaceId === undefined) return null
    const { logout } = this.props;
     
    const workspaces = this.props.workspaces.map(workspace => {
      return (
        <WorkspaceIndexItem
          key={workspace.id}
          workspace={workspace}
          currentWorkspaceId={this.props.match.params.workspaceId} />
      );
    });

    // ??? modalbnb
    return (
      <div>
        <div className="user-dropdown" >
          <div onClick={this.toggleDropdown} className="user-dropdown-button">DU</div>
          <div className="user-dropdown-container">
            <div className="user-dropdown-workspaces">
                {workspaces}
            </div>
            <div>
              {this.props.createForm}
              {this.props.editForm}
              <p onClick={this.handleDelete} className='user-dropdown-row'>
                Delete Current Workspace
              </p>
            </div>
            <div>
              <p onClick={logout} className='user-dropdown-row'>Log Out</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserDropdown);
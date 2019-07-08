import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from '../workspaces/workspace_index_item';

class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  dropdownToggle() {
    // ??? should this live somewhere else?
    // ??? how to combine into one form?
    const userDropdown = document.getElementsByClassName("user-dropdown-container")[0];
    const openCreate = document.getElementsByClassName("create-workspace-modal")[0];
    const openEdit = document.getElementsByClassName("edit-workspace-modal")[0];
    const cross = document.getElementsByClassName("workspace-form-cross");
    const createModal = document.getElementsByClassName("create-workspace-form-modal")[0];
    const editModal = document.getElementsByClassName("edit-workspace-form-modal")[0];
    const workspaceButton = document.getElementsByClassName("workspace-form-button");

    openCreate.onclick = () => createModal.style.display = "block";
    openEdit.onclick = () => editModal.style.display = "block";
    for (let i = 0; i < cross.length; i++) {
      cross[i].onclick = () => {
        createModal.style.display = "none";
        editModal.style.display = "none";
      }
    }

    window.onclick = (event) => {
      if (!event.target.matches('.user-dropdown-button') &&
        userDropdown.classList.contains('show')) {
          userDropdown.classList.toggle("show");
      }

      // why can't it be event.target == (createModal || editModal)
      if (event.target == createModal || event.target == editModal || event.target == workspaceButton[0] || event.target == workspaceButton[1]) {
        editModal.style.display = "none";
        createModal.style.display = "none";
      }
    }

    $(document).keydown(function (e) {
      // ESCAPE key pressed
      if (e.keyCode == 27) {
        editModal.style.display = "none";
        createModal.style.display = "none";
      }
    });
  }

  componentDidMount() {
    this.dropdownToggle();
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteWorkspace(this.props.currentWorkspace.id).then(() => this.props.history.push('/1')); 
  }

  render() {
    const { logout } = this.props;

    const workspaces = this.props.workspaces.map(workspace => {
      return (
        <WorkspaceIndexItem
          key={workspace.id}
          workspace={workspace}
          currentWorkspace={this.props.currentWorkspace} />
      );
    });    
    
    return (
      <div>
        <div className="user-dropdown" >
          <button onClick={dropdownShow} className="user-dropdown-button">DU</button>
          <div className="user-dropdown-container">
            <div>
                {workspaces}
            </div>
            <div>
              <p className='user-dropdown-row create-workspace-modal'>
                Create Workspace
              </p>
              <p className='user-dropdown-row edit-workspace-modal'>
                Edit Workspace
              </p>
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
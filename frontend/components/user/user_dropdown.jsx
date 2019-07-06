import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from '../workspaces/workspace_index_item';


class UserDropdown extends React.Component {

  componentDidMount() {
    this.props.requestWorkspaces()
  }

  render() {
    if (this.props.workspaces === undefined) return null;

    const workspaces = this.props.workspaces.map(workspace => {
      return (
        <WorkspaceIndexItem
          key={workspace.id}
          workspace={workspace}
          workspaceId={this.props.match.params.workspaceId} />
      );
    });    

    return (
      <div>
        <div className="user-dropdown">
          <button onClick={dropdownShow} className="user-dropdown-button">DU</button>
          <div id="myDropdown" className="user-dropdown-container">
            <div>
                {workspaces}
            </div>
            <div>
              <span onClick={this.props.deleteWorkspace} className='user-dropdown-row'>
                Delete Workspace
              </span>
            </div>
            <div>
              <span onClick={this.props.logout} className='user-dropdown-row'>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserDropdown);
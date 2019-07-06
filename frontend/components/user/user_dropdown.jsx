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
          workspace={workspace} />
      );
    });    

    return (
      <div>
        <div className="user-dropdown">
          <button onClick={myFunction} className="dropbtn">DU</button>
          <div id="myDropdown" className="dropdown-content">
              {workspaces}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserDropdown);
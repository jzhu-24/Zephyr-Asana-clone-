import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WorkspaceIndexItem from './workspace_index_item';

class WorkspaceIndex extends React.Component {

  componentDidMount() {
    this.props.requestWorkspaces();
  }

  render() {
    const workspaces = this.props.workspaces.map(workspace => {
      return (
        <WorkspaceIndexItem
          key={workspace.id}
          workspace={workspace}
          deleteWorkspace={this.props.deleteWorkspace} />
      );
    });

    return (
      <div>
        <ul>
          {workspaces}
        </ul>
        <Link to="/" >Signup</Link>
        <Link to="/login" >Login</Link>
        <button className="logout-button" onClick={this.props.logout}>Log Out</button>
      </div>
    )
  }
}

export default withRouter(WorkspaceIndex);
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class WorkspaceHeader extends React.Component {

  componentDidMount() {
    this.props.requestWorkspace(this.props.match.params.workspaceId)
  }

  render() {
    if (this.props.workspace === undefined) return null;

    return (
      <div>
        <span className='workspace-nav-title'>{this.props.workspace.name}</span>
      </div>
    )
  }
}

export default withRouter(WorkspaceHeader);
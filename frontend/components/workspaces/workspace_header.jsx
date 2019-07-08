import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class WorkspaceHeader extends React.Component {
  render() {
    return (
      <div>
        <p className='workspace-nav-title'>{this.props.currentWorkspace.name}</p>
      </div>
    )
  }
}

export default withRouter(WorkspaceHeader);
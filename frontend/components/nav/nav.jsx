import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import WorkspaceIndexContainer from '../workspaces/workspace_index_container';

class Nav extends React.Component {

  render() {

    return (
      <div className="nav">
        <img src={window.images.logo} alt="logo" className="nav-logo" />
        <div className="nav-links">
          <Link to="/0" className="nav-home">Home</Link>
        </div>
        <div className="nav-favorites">
          <span>Favorites</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Nav);
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Nav extends React.Component {

  componentDidMount() {
    this.props.requestWorkspace(this.props.match.params.workspaceId)
  }

  render() {
    // ??? render (must have conditional) -> componentDidMount
    if (this.props.workspace === undefined) return null;

    return (
      <div className="nav">
        <img src={window.images.logo} alt="logo" className="nav-logo" />
        <div className="nav-links">
          <Link to="/1" className="nav-link">Home</Link>
        </div>
        <div className="nav-favorites">
          <span className="nav-favorites-title">Favorites</span>
        </div>
        <span className='nav-workspace'>{this.props.workspace.name}</span>
      </div>
    )
  }
}

export default withRouter(Nav);
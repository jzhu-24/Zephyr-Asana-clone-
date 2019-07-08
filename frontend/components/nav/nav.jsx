import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Nav extends React.Component {

  render() {
    return (
      <div className="nav">
        <img src={window.images.logo} alt="logo" className="nav-logo" />
        <div className="nav-links">
          <Link to="/1" className="nav-link">Home</Link>
        </div>
        <div className="nav-favorites">
          <p className="nav-favorites-title">Favorites</p>
        </div>
        <p className='nav-workspace'>{this.props.currentWorkspace.name}</p>
      </div>
    )
  }
}

export default withRouter(Nav);
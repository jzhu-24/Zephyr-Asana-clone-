import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProjectIndexContainer from '../projects/project_index_container';
import merge from "lodash/merge";

class Nav extends React.Component {

  componentDidMount() {
    this.props.requestWorkspace(this.props.match.params.workspaceId);
  }

  render() {
    if (this.props.currentWorkspace === undefined) {
      return (
        <div className="nav">
          <img src={window.images.logo} alt="logo" className="nav-logo" />
          <div className="nav-links">
            <Link to="/0" className="nav-link">
              Home
            </Link>
          </div>
          <div className="nav-favorites">
            <p className="nav-favorites-title">Favorites</p>
          </div>
          <p className="nav-workspace">
          </p>
        </div>
      );
    }
    
    return (
      <div className="nav">
        <img src={window.images.logo} alt="logo" className="nav-logo" />
        <div className="nav-links">
          <Link to="/0" className="nav-link">Home</Link>
        </div>
        <div className="nav-favorites">
          <p className="nav-favorites-title">Favorites</p>
        </div>
        <p className='nav-workspace'>{this.props.currentWorkspace.name}</p>
        <ProjectIndexContainer 
          match={this.props.match}/>
      </div>
    )
  }
}

export default withRouter(Nav);
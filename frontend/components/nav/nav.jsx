import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProjectIndex from '../projects/project_index';

class Nav extends React.Component {

  componentDidMount() {
    const { requestWorkspace, requestProjects } = this.props;
    const { workspaceId } = this.props.match.params;

    if (workspaceId > 0) requestWorkspace(workspaceId);
    requestProjects(workspaceId);
  }

  render() {
    const { currentWorkspace, match, projects } = this.props;

    if (currentWorkspace === undefined) {
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
        <Link to={`/${currentWorkspace.id}`} className="nav-workspace">{currentWorkspace.name}</Link>
        <ProjectIndex match={match} projects={projects} />
      </div>
    )
  }
}

export default withRouter(Nav);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProjectIndex from '../projects/project_index';

class Nav extends React.Component {

  componentDidMount() {
    const { requestWorkspace, requestProjects, requestProjectFavorites } = this.props;
    const { workspaceId } = this.props.match.params;

    if (workspaceId > 0) requestWorkspace(workspaceId);
    requestProjects(workspaceId);
    requestProjectFavorites(workspaceId);
    document.addEventListener('keydown', this.closeDropdown);
    document.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeDropdown);
    document.removeEventListener('click', this.closeDropdown);
  }

  // static function
  closeDropdown(e) {
    const { target } = e;
    const projectId = e.target.classList[1];
    const projectElement = document.getElementsByClassName(`nav-project ${projectId}`)[0];
    const currentId = document.getElementsByClassName('show')[1];
    const currentDropdown = document.getElementsByClassName('show')[0];
    const currentProjectHover = document.getElementsByClassName('projectHover')[0];
    const otherDropdowns = ['project-ellipsis', 'nav-project-ellipsis', 'user-dropdown-button'];

    if (target.className === `nav-project-ellipsis ${projectId}`) {
      target.children[0].classList.toggle('show');
      projectElement && projectElement.classList.add('projectHover');
    }

    if ((target.className !== `nav-project-ellipsis ${currentId}` && !otherDropdowns.includes(target.classList[0])) || e.keyCode === 27) {
      currentDropdown && currentDropdown.classList.remove('show');
      currentProjectHover && currentProjectHover.classList.remove('projectHover');
    }
  }

  render() {
    const { currentWorkspace, match, projects, favoritedProjects, createProject, deleteProject, editProject } = this.props;

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
          <ProjectIndex match={match} projects={favoritedProjects} />
        </div>
        <div className="nav-header">
          <Link to={`/${currentWorkspace.id}`} className="nav-workspace">{currentWorkspace.name}</Link>
          <div className="nav-create-project" onClick={() => createProject()}>+</div>
        </div>
        <ProjectIndex
          match={match}
          projects={projects}
          editProject={editProject}
          deleteProject={deleteProject}
        />
      </div>
    )
  }
}

export default withRouter(Nav);

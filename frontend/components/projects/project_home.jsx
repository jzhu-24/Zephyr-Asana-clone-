/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-parens */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ProjectHome extends React.Component {
  constructor(props) {
    super(props);

    this.closeDropdown = this.closeDropdown.bind(this);
    // this.toggleDropdown = this.toggleDropdown.bind(this);
    this.showLiked = this.showLiked.bind(this);
  }

  componentDidMount() {
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
    const projectElement = document.getElementsByClassName(`project ${projectId}`)[0];
    const currentId = document.getElementsByClassName('show')[1];
    const currentDropdown = document.getElementsByClassName('show')[0];
    const currentProjectHover = document.getElementsByClassName('projectHover')[0];
    const otherDropdowns = ['project-ellipsis', 'nav-project-ellipsis', 'user-dropdown-button'];

    if (target.className === `project-ellipsis ${projectId}`) {
      target.children[0].classList.toggle('show');
      projectElement.classList.add('projectHover');
    }

    if ((target.className !== `project-ellipsis ${currentId}` && !otherDropdowns.includes(target.classList[0])) || e.keyCode === 27) {
      currentDropdown && currentDropdown.classList.remove('show');
      currentProjectHover && currentProjectHover.classList.remove('projectHover');
    }
  }

  showLiked(project) {
    const { favoritedProjects, createProjectFavorite, deleteProjectFavorite } = this.props;

    return (
      <FontAwesomeIcon
        icon={favoritedProjects[project.id] ? solidStar : regStar}
        className="project-favorite"
        onClick={() => favoritedProjects[project.id] ? deleteProjectFavorite(favoritedProjects[project.id]) : createProjectFavorite(project.id)}
      />
    );
  }

  render() {
    const { createProject, projects, deleteProject, editProject } = this.props;

    const projectIndex = projects.map(project => {
      return (
        <div className={`project ${project.id}`} key={project.id}>
          <div>
            {this.showLiked(project)}
            <div className={`project-ellipsis ${project.id}`}>
              ...
              <div className={`project-dropdown ${project.id}`}>
                <div className="project-dropdown-item" onClick={() => editProject(project.id)}>Edit Project</div>
                <div className="project-dropdown-item" onClick={() => deleteProject(project.id)}>Delete Project</div>
              </div>
            </div>
          </div>
          <Link to={`/${project.workspace_id}/${project.id}`}>
            <div className="project-tile" />
            <FontAwesomeIcon icon={faTrello} className="project-list-icon" />
            <div className="project-name">{project.name}</div>
          </Link>
        </div>
      );
    });

    return (
      <div className="project-home">
        <div className="project-title">Recent Projects</div>
        <div className="project-index-border" />
        <div className="project-index">
          {projectIndex}
          <div className="project new-project" onClick={() => createProject()}>
            <div>
              <div className="new-project-tile">+</div>
              <div className="project-name-new">New Project</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectHome);

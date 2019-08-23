import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
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

  // toggleDropdown(id) {
  //   // const projectHoverElement = document.getElementsByClassName(`project-Hover`);
  //   // projectHoverElement && projectHoverElement.classList.remove('projectHover');

  //   const projectDropdownElement = document.getElementsByClassName(`project-dropdown ${id}`)[0]
  //   projectDropdownElement.classList.toggle('show');
  //   // projectDropdownElement.parentElement.parentElement.parentElement.classList.add('projectHover');
  // }

  closeDropdown(e) {
    const target = e.target;
    const projectId = e.target.classList[1];
    const projectElement = document.getElementsByClassName(`project ${projectId}`)[0];
    const currentId = document.getElementsByClassName('show')[1];
    const currentDropdown = document.getElementsByClassName('show')[0];
    const currentProjectHover = document.getElementsByClassName('projectHover')[0];

    if (target.className === `project-ellipsis ${projectId}`) {
      target.children[0].classList.toggle('show');
      projectElement.classList.add('projectHover');
    } 
    
    if (target.className !== `project-ellipsis ${currentId}` || e.keyCode === 27) {
      currentDropdown.classList.remove('show');
      currentProjectHover.classList.remove('projectHover');
    }
  }

  showLiked(project) {
    const { favoritedProjects, createProjectFavorite, deleteProjectFavorite } = this.props;

    if (favoritedProjects[project.id]) {
      return <FontAwesomeIcon icon={solidStar} className="project-favorite" onClick={() => deleteProjectFavorite(favoritedProjects[project.id])}></FontAwesomeIcon>
    } else {
      return <FontAwesomeIcon icon={regStar} className="project-favorite" onClick={() => createProjectFavorite(project.id)}></FontAwesomeIcon>
    }
  }

  render() {
    const { createProject, projects, deleteProject, editProject } = this.props;

    const projectIndex = projects.map(project => {
      return (
        <div className={`project ${project.id}`} key={project.id}>
          <div>
            {this.showLiked(project)}
            <div className={`project-ellipsis ${project.id}`} >
              ...
              <div className={`project-dropdown ${project.id}`}>
                <div className="project-dropdown-item" onClick={() => editProject(project.id)} >Edit Project</div>
                <div className="project-dropdown-item" onClick={() => deleteProject(project.id)} >Delete Project</div>
              </div>
            </div>
          </div>
          <Link to={`/${project.workspace_id}/${project.id}`}>
            <div className="project-tile"></div>
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
            <div className="project-name">New Project</div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectHome);

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

    this.showLiked = this.showLiked.bind(this);
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

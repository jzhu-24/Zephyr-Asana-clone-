import React from "react";
import { Link, withRouter } from "react-router-dom";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ProjectHome extends React.Component {
  componentDidMount() {
    const { workspaceId } = this.props.match.params;
    const { requestProjects, requestProjectFavorites } = this.props;

    requestProjects(workspaceId);
    requestProjectFavorites(workspaceId);

    this.showLiked = this.showLiked.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { workspaceId } = this.props.match.params;
    const { requestProjects, requestProjectFavorites, favoritedProjects } = this.props;

    if (prevProps.match.params.workspaceId !== workspaceId) {
      requestProjects(workspaceId);
    }

    // if (prevProps.favoritedProjects.length !== favoritedProjects.length) {
    //   requestProjectFavorites(workspaceId);
    // }
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
    const { createProject, projects, favoritedProjects } = this.props;

    const projectIndex = projects.map(project => {
      return (
        <div className="project" key={project.id}>
          {this.showLiked(project)}
          <Link to={`/${project.workspace_id}/${project.id}`}>
            <div className="project-tile">
            </div>
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

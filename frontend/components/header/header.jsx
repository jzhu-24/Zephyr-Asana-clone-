import React from 'react';
import { withRouter } from 'react-router-dom';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.showLiked = this.showLiked.bind(this);
  }

  componentDidMount() {
    const { requestProjectFavorite, favoritedProjects } = this.props;
    const { projectId } = this.props.match.params;

    requestProjectFavorite(favoritedProjects[projectId]);
  }

  showLiked(project) {
    const { favoritedProjects, createProjectFavorite, deleteProjectFavorite } = this.props;

    if (favoritedProjects[project.id]) {
      return <FontAwesomeIcon icon={solidStar} className="header-project-favorited" onClick={() => deleteProjectFavorite(favoritedProjects[project.id])}></FontAwesomeIcon>
    } else {
      return <FontAwesomeIcon icon={regStar} className="header-project-favorite" onClick={() => createProjectFavorite(project.id)}></FontAwesomeIcon>
    }
  }
  render() {
    const { currentProject } = this.props;
    const projectFavoriteClassNames = {
      favorited: 'header-project-favorited',
      unFavorited: 'header-project-favorite',
    }

    return (
      <div className="header">
        <p className="header-project-name">{currentProject ? currentProject.name : "Home"}</p>
        {currentProject && this.showLiked(currentProject)}
      </div>
    );
  }
}

export default withRouter(Header);

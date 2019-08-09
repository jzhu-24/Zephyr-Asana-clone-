import React from 'react';
import { withRouter } from "react-router-dom";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProjectFavorite(props) {  
  const { currentProject, favoritedProjects, createProjectFavorite, deleteProjectFavorite, classNames } = props;

  if (favoritedProjects[currentProject.id]) {
    return <FontAwesomeIcon icon={solidStar} className={classNames[favorited]} onClick={() => deleteProjectFavorite(favoritedProjects[currentProject.id])}></FontAwesomeIcon>
  } else {
    return <FontAwesomeIcon icon={regStar} className={classNames[unFavorited]} onClick={() => createProjectFavorite(currentProject.id)}></FontAwesomeIcon>
  }
}

export default withRouter(ProjectFavorite);

import { connect } from 'react-redux';
import Header from './header';
import { requestProjects } from '../../actions/project_actions';
import { createProjectFavorite, requestProjectFavorite, deleteProjectFavorite } from '../../actions/project_favorites_actions';

const mapStateToProps = (state, {match}) => {

  const favoritedProjects = {};

  // selector for projectFavorites for current user only
  Object.values(state.entities.projectFavorites).forEach(projectFavorite => {
    if (state.session.currentUser === projectFavorite.user_id) favoritedProjects[projectFavorite.project_id] = projectFavorite.id;
  });

  return {
    currentProject: state.entities.projects[match.params.projectId],
    favoritedProjects,
  }
}

const mapDispatchToProps = dispatch => ({
  requestProject: id => dispatch(requestProjects(id)),
  createProjectFavorite: projectId => dispatch(createProjectFavorite(projectId)),
  deleteProjectFavorite: projectId => dispatch(deleteProjectFavorite(projectId)),
  requestProjectFavorite: projectId => dispatch(requestProjectFavorite(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

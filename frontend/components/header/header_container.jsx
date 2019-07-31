import { connect } from 'react-redux';
import Header from './header';
import { requestProjects } from '../../actions/project_actions';

const mapStateToProps = (state, {match}) => {
  return {
    currentProject: state.entities.projects[match.params.projectId],
  }
}

const mapDispatchToProps = dispatch => ({
  requestProject: id => dispatch(requestProjects(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import { connect } from 'react-redux';
import ProjectShow from './project_show';
import {
  deleteProject,
  updateProject,
} from '../../actions/project_actions';

const mapStateToProps = (state, {match}) => {
  return {
    projects: state.entities.projects[match.params.projectId]
  };
};

const mapDispatchToProps = dispatch => ({
  updateProject: project => dispatch(updateProject(project)),
  deleteProject: id => dispatch(deleteProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectShow);
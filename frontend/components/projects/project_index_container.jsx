import { connect } from 'react-redux';
import ProjectIndex from './project_index';
import {
  requestProject,
  requestProjects,
  deleteProject,
  updateProject,
  createProject
} from '../../actions/project_actions';

// ??? why can't I export/import?
// ??? send extra params to backend or filter here?

const selectProjects = ({ projects }, workspaceId) => {
  return Object.values(projects).filter(
    project => project.workspace_id === parseInt(workspaceId)
  );
};

const mapStateToProps = (state, ownProps) => {
  const currentWorkspaceId = ownProps.match.params.workspaceId;

  return {
    projects: selectProjects(state.entities, currentWorkspaceId)
  };
};

const mapDispatchToProps = dispatch => ({
  requestProjects: () => dispatch(requestProjects()),
  requestProject: id => dispatch(requestProject(id)),
  createProject: (workspace_id, project) =>
    dispatch(createProject((workspace_id, project))),
  updateProject: project => dispatch(updateProject(project)),
  deleteProject: id => dispatch(deleteProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIndex);
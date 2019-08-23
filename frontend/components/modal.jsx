import React from 'react';
import { closeModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import WorkspaceCreateModalContainer from './workspaces/workspace_create_modal_container';
import WorkspaceEditModalContainer from './workspaces/workspace_edit_modal_container';
import ProjectCreateModalContainer from './projects/project_create_modal_container';
import ProjectEditModalContainer from './projects/project_edit_modal_container';
import TaskEditModalContainer from './tasks/task_edit_modal_container';

// ??? understand how this works in relation to loading states (?)

function Modal(props) {
  const { modal, currentProject, currentWorkspace, match, tasks, closeModal } = props;

  if (!modal) {
    return null;
  }

  let component;

  switch (modal.value) {
    case "createWorkspace":
      component = <WorkspaceCreateModalContainer />;
      break;
    case "editWorkspace":
      component = (
        <WorkspaceEditModalContainer
          currentWorkspace={currentWorkspace}
        />
      );
      break;
    case "editTask":
      component = <TaskEditModalContainer taskId={match.params.taskId} columnId={tasks[match.params.taskId] && tasks[match.params.taskId].column_id} />;
      break;
    case "createProject":
      component = <ProjectCreateModalContainer currentWorkspace={currentWorkspace} />;
      break;
    case "editProject":
      component = <ProjectEditModalContainer project={currentProject} />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state, { match }) => {
  return {
    tasks: state.entities.tasks,
    currentWorkspace: state.entities.workspaces[match.params.workspaceId],
    currentProject: state.entities.projects[state.ui.modal && state.ui.modal.id],
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

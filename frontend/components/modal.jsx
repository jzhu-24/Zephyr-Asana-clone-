import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";
import WorkspaceCreateFormContainer from "./workspaces/workspace_create_form_container";
import WorkspaceEditFormContainer from "./workspaces/workspace_edit_form_container";
import ProjectCreateFormContainer from "./projects/project_create_form_container";
import TaskEditFormContainer from "./tasks/task_edit_form_container";

// ??? understand how this works in relation to loading states (?)

function Modal(props) {
  if (!props.modal) {
    return null;
  }

  let component;

  switch (props.modal) {
    case "createWorkspace":
      component = <WorkspaceCreateFormContainer />;
      break;
    case "editWorkspace":
      component = (
        <WorkspaceEditFormContainer
          currentWorkspace={props.currentWorkspace}
        />
      );
      break;
    case "editTask":
      component = <TaskEditFormContainer taskId={props.match.params.taskId} columnId={props.tasks[props.match.params.taskId] && props.tasks[props.match.params.taskId].column_id} />;
      break;
    case "createProject":
      component = <ProjectCreateFormContainer currentWorkspace={props.currentWorkspace} />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={props.closeModal}>
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
    modal: state.ui.modal
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

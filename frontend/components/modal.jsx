import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";
import WorkspaceCreateFormContainer from "./workspaces/workspace_create_form_container";
import WorkspaceEditFormContainer from "./workspaces/workspace_edit_form_container";

// ??? understand how this works in relation to loading states (?)

function Modal({ modal, closeModal, currentWorkspace }) {
  if (!modal) {
    return null;
  }

  let component;

  switch (modal) {
    case "createWorkspace":
      component = <WorkspaceCreateFormContainer />;
      break;
    case "editWorkspace":
      component = (
        <WorkspaceEditFormContainer
          currentWorkspace={currentWorkspace}
        />
      );
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

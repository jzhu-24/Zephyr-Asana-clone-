import React from 'react';
import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import { openModal } from '../../actions/modal_actions';
import { requestWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';
import { requestUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => {
  if (Object.keys(state.entities.workspaces).length === 0) return {};

  return {
    workspaceIds: Object.keys(state.entities.workspaces),
    workspaces: Object.values(state.entities.workspaces),
    users: state.entities.users,
    currentUser: state.session.currentUser,
  }
};

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  deleteWorkspace: id => dispatch(deleteWorkspace(id)),
  requestUsers: () => dispatch(requestUsers()),
  logout: () => dispatch(logout()),
  createForm: (
    <p className="user-dropdown-row" onClick={() => dispatch(openModal("createWorkspace"))}>
      Create Workspace
    </p>
  ),
  editForm: (
    <p className="user-dropdown-row" onClick={() => dispatch(openModal("editWorkspace"))}>
      Edit Workspace
    </p>
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);

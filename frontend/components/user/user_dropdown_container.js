import React from 'react';
import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import { openModal, closeModal } from '../../actions/modal_actions';
import { requestWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => ({
  workspaces: Object.values(state.entities.workspaces)
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
  deleteWorkspace: id => dispatch(deleteWorkspace(id)),
  logout: () => dispatch(logout()),
  createForm: (
    <p className='user-dropdown-row' onClick={() => dispatch(openModal('createWorkspace'))}>
      Create Workspace
    </p>
  ),
  editForm: (
    <p className='user-dropdown-row' onClick={() => dispatch(openModal('editWorkspace'))}>
      Edit Workspace
    </p>
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
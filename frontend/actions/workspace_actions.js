import { 
  fetchWorkspaces,
  fetchWorkspace,
  postWorkspace,
  patchWorkspace,
  destroyWorkspace } from '../util/workspace_util';

export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';
export const CLEAR_WORKSPACE_ERRORS = 'CLEAR_WORKSPACE_ERRORS';
export const RECEIVE_WORKSPACE_ERRORS = 'RECEIVE_WORKSPACE_ERRORS';

const receiveErrors = errors => ({
  type: RECEIVE_WORKSPACE_ERRORS,
  errors,
});

const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces,
});

const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace,
});

const removeWorkspace = workspaceId => ({
  type: REMOVE_WORKSPACE,
  workspaceId,
});

const clearError = () => ({
  type: CLEAR_WORKSPACE_ERRORS,
});

export const requestWorkspaces = () => dispatch => (
  fetchWorkspaces().then(workspaces => dispatch(receiveWorkspaces(workspaces)))
);

export const requestWorkspace = id => dispatch => (
  fetchWorkspace(id).then(workspace => dispatch(receiveWorkspace(workspace)))
);

export const createWorkspace = workspace => dispatch => postWorkspace(workspace)
  .then(workspace => dispatch(receiveWorkspace(workspace)), err => (dispatch(receiveErrors(err.responseJSON))));

export const updateWorkspace = workspace => dispatch => patchWorkspace(workspace)
  .then(workspace => dispatch(receiveWorkspace(workspace)), err => (dispatch(receiveErrors(err.responseJSON))));

export const deleteWorkspace = id => dispatch => (
  destroyWorkspace(id).then(workspace => dispatch(removeWorkspace(id))));

export const clearErrors = () => dispatch => dispatch(clearError());

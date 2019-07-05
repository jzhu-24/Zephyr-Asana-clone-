import * as WorkspaceUtil from '../util/workspace_util';

export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';

// ??? do we filter stuff like fetchWorkspaces in actions?

export const requestWorkspaces = () => dispatch => (
  WorkspaceUtil.fetchWorkspaces().then(workspaces => dispatch(receiveWorkspaces(workspaces)))
);

export const requestWorkspace = id => dispatch => (
  WorkspaceUtil.fetchWorkspace(id).then(workspace => dispatch(receiveWorkspace(workspace)))
);

export const createWorkspace = workspace => dispatch => (
  WorkspaceUtil.createWorkspace(workspace).then(workspace => dispatch(receiveWorkspace(workspace)))
);

export const updateWorkspace = workspace => dispatch => (
  WorkspaceUtil.updateWorkspace(workspace).then(workspace => dispatch(receiveWorkspace(workspace)))
);

export const deleteWorkspace = id => dispatch => (
  WorkspaceUtil.deleteWorkspace(id).then(workspace => dispatch(removeWorkspace(id)))
);

const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace
});

const removeWorkspace = workspaceId => ({
  type: REMOVE_WORKSPACE,
  workspaceId
});
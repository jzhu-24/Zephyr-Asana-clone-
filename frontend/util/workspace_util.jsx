export const fetchWorkspaces = () => (
  $.ajax({
    method: `GET`,
    url: `api/workspaces`
  })
);

export const fetchWorkspace = id => (
  $.ajax({
    method: `GET`,
    url: `api/workspaces/${id}`
  })
);

export const postWorkspace = workspace => (
  $.ajax({
    method: `POST`,
    url: `api/workspaces`,
    data: { workspace }
  })
);

export const patchWorkspace = workspace => (
  $.ajax({
    method: `PATCH`,
    url: `api/workspaces/${workspace.id}`,
    data: { workspace }
  })
);

export const destroyWorkspace = id => (
  $.ajax({
    method: `DELETE`,
    url: `api/workspaces/${id}`
  })
);

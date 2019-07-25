export const fetchProjects = workspace_id => (
  $.ajax({
    method: `GET`,
    url: `api/workspaces/${workspace_id}/projects`
  })
);

export const fetchProject = id => (
  $.ajax({
    method: `GET`,
    url: `api/projects/${id}`
  })
);

export const postProject = project => (
  $.ajax({
    method: `POST`,
    url: `api/workspaces/${project.workspace_id}/projects`,
    data: { project }
  })
);

export const patchProject = project => (
  $.ajax({
    method: `PATCH`,
    url: `api/projects/${project.id}`,
    data: { project }
  })
);

export const destroyProject = id => (
  $.ajax({
    method: `DELETE`,
    url: `api/projects/${id}`
  })
);

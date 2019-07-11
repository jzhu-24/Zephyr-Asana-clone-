export const fetchColumns = project_id => {
  return $.ajax({
    method: `GET`,
    url: `api/projects/${project_id}/columns`
  });
}

export const fetchColumn = id =>
  $.ajax({
    method: `GET`,
    url: `api/columns/${id}`
  });

export const postColumn = column =>
  $.ajax({
    method: `POST`,
    url: `api/projects/${column.project_id}/columns`,
    data: { column }
  });

export const patchColumn = column =>
  $.ajax({
    method: `PATCH`,
    url: `api/columns/${column.id}`,
    data: { column }
  });

export const destroyColumn = id =>
  $.ajax({
    method: `DELETE`,
    url: `api/columns/${id}`
  });

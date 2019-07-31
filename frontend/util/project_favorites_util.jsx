export const fetchProjectFavorites = workspace_id => {
  return $.ajax({
    method: 'GET',
    url: `api/project_favorites`,
    data: { workspace_id },
  });
}

export const postProjectFavorite = project_id => (
  $.ajax({
    method: 'POST',
    url: `api/project_favorites`,
    data: { project_id },
  })
);

export const destroyProjectFavorite = project_id => (
  $.ajax({
    method: 'DELETE',
    url: `api/project_favorites/${project_id}`,
    data: { project_id },
  })
);

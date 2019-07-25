export const fetchTasks = column_id => {
  return $.ajax({
    method: `GET`,
    url: `api/columns/${column_id}/tasks`
  });
};

export const fetchTask = id =>
  $.ajax({
    method: `GET`,
    url: `api/tasks/${id}`
  });

export const postTask = task =>
  $.ajax({
    method: `POST`,
    url: `api/columns/${task.column_id}/tasks`,
    data: { task }
  });

export const patchTask = task =>
  $.ajax({
    method: `PATCH`,
    url: `api/tasks/${task.id}`,
    data: { task }
  });

export const destroyTask = id =>
  $.ajax({
    method: `DELETE`,
    url: `api/tasks/${id}`
  });

export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: `api/users`,
  });
};

export const fetchUser = id =>
  $.ajax({
    method: 'GET',
    url: `api/users/${id}`,
  });

export const patchUser = user =>
  $.ajax({
    method: 'PATCH',
    url: `api/users/${user.id}`,
    data: { user },
  });

export const destroyUser = id =>
  $.ajax({
    method: 'DELETE',
    url: `api/users/${id}`,
  });

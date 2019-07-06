export const fetchUsers = () => (
  $.ajax({
    method: "GET",
    url: "api/users"
  })
);

export const fetchUser = id => (
  $.ajax({
    method: "GET",
    url: `api/users/${id}`
  })
);

export const postUser = user => (
  $.ajax({
    method: "POST",
    url: "api/users",
    data: { user: user }
  })
);

export const postSession = user => (
  $.ajax({
    method: "POST",
    url: "api/session",
    data: { user: user }
  })
);

export const deleteSession = () => (
  $.ajax({
    method: "DELETE",
    url: "api/session"
  })
);

import {
  fetchUsers,
  fetchUser,
  patchUser,
  destroyUser,
} from '../util/user_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

const removeUser = userId => ({
  type: REMOVE_USER,
  userId,
});

export const requestUsers = () => dispatch =>
  fetchUsers().then(users => dispatch(receiveUsers(users)));

export const requestUser = id => dispatch =>
  fetchUser(id).then(user => dispatch(receiveUser(user)));

export const updateUser = user => dispatch =>
  patchUser(user).then(user => dispatch(receiveUser(user)));

export const deleteUser = id => dispatch =>
  destroyUser(id).then(user => dispatch(removeUser(id)));

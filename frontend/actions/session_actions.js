import { postUser, postSession, deleteSession } from '../util/session_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const clearError = () => ({
  type: CLEAR_SESSION_ERRORS,
});

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const createNewUser = formUser => dispatch => postUser(formUser).then(user =>
  dispatch(receiveCurrentUser(user)), err => (dispatch(receiveErrors(err.responseJSON))));

export const login = formUser => dispatch => postSession(formUser).then(user =>
  dispatch(receiveCurrentUser(user)), err => (dispatch(receiveErrors(err.responseJSON))));

export const logout = () => dispatch => deleteSession()
  .then(() => dispatch(logoutCurrentUser()));

export const clearErrors = () => dispatch => dispatch(clearError());

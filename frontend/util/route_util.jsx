import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { fetchWorkspaces } from '../util/workspace_util';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
  }
};

const Auth = ({ loggedIn, path, component: Component, history }) => {
  fetchWorkspaces().then(workspaces => {
    
  })

  // const firstWorkspaceId = Object.keys(workspaces)[0];
  const prevPath = history.location.pathname;
  const newPath = (isNaN(prevPath[1]) ? `/${1}` : prevPath);

  return <Route
    path={path}
    render={props => loggedIn ? <Redirect to={newPath} /> : <Component {...props} />}
  />
}

const Protected = ({ loggedIn, path, component: Component, history }) => {
  const prevPath = history.location.pathname;
  const newPath = (isNaN(prevPath[1]) ? prevPath : '/signup');
  
  return <Route
    path={path}
    render={props => (
      loggedIn ? <Component {...props} /> : <Redirect to={newPath} />
    )}
  />
}

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

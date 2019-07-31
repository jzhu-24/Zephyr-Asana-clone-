import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
  }
};

const Auth = ({ loggedIn, path, component: Component, history }) => {
  const prevPath = history.location.pathname;
  const newPath = (isNaN(prevPath[1]) ? '/0' : prevPath);

  return <Route
    path={path}
    render={props => loggedIn ? <Link to={newPath} /> : <Component {...props} />}
  />
}

const Protected = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
    )}
  />
)

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

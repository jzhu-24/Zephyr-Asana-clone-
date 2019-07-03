import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import WorkspaceIndex from './workspaces/workspace_index_container';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default () => (
    <div>
        {/* todo - how to route everything to /login */}
        <AuthRoute path="/login" component={LoginContainer} />
        <AuthRoute path="/signup" component={SignupContainer} />
        {/* <Route exact path="/" component={WorkspaceIndex} /> */}
        <ProtectedRoute path="/workspaces" component={WorkspaceIndex} />
    </div>
);
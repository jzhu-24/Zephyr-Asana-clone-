import React from 'react';
import { Route } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import WorkspaceIndex from './workspaces/workspace_index_container';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default () => (
    <div>
        <Route path="/" component={Home} />
        {/* <Route exact path="/" component={WorkspaceIndex} /> */}
        <ProtectedRoute path="/workspaces" component={WorkspaceIndex} />
        <AuthRoute path="/signup" component={SignupContainer} />
    </div>
);
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import WorkspaceIndex from './workspaces/workspace_index_container';
import { AuthRoute, ProtectedRoute } from "../util/route_util";

// fix routes on heroku - https://stackoverflow.com/questions/41772411/react-routing-works-in-local-machine-but-not-heroku
// ??? study this shit

export default () => (
    <div>
        <Switch>
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            <ProtectedRoute path="/" component={WorkspaceIndex} />
            <AuthRoute path="/" component={SignupContainer} />
            <Redirect path="/signup" />
        </Switch>
    </div>
);
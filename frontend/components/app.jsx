import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import ProtectedContainer from './protected/protected_container';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
// import WorkspaceForm from '../../frontend/components/workspaces/workspace_form';

export default () => (
    <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginContainer} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute path="/" component={SignupContainer} />
            <Redirect to="/signup" />
        </Switch>
        
        <ProtectedRoute exact path="/:workspaceId" component={ProtectedContainer} />
    </div>
);
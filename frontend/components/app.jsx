import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import Nav from './nav/nav_container';
import WorkspaceHeaderContainer from './workspaces/workspace_header_container';
import UserDropdownContainer from './user/user_dropdown_container';

import { AuthRoute, ProtectedRoute } from "../util/route_util";

// ??? study this shit

export default () => (
    <div>
        <Switch>
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            <AuthRoute path="/" component={SignupContainer} />
            <Redirect to="/signup" />
        </Switch>
        <div className='protected'>
            <ProtectedRoute path="/:workspaceId" component={Nav} />
            <header className='header'>
                <ProtectedRoute path="/:workspaceId" component={WorkspaceHeaderContainer} />
                <ProtectedRoute path="/" component={UserDropdownContainer} />
            </header>
        </div>
    </div>
);
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Nav from './nav/nav_container';
import WorkspaceHeaderContainer from './workspaces/workspace_header_container';
import UserDropdownContainer from './user/user_dropdown_container';
import { ProtectedRoute } from "../util/route_util";

export default () => (
  <div className="protected">
    <ProtectedRoute path="/:workspaceId" component={Nav} />
    <header className='header'>
      <ProtectedRoute path="/:workspaceId" component={WorkspaceHeaderContainer} />
      <ProtectedRoute path="/:workspaceId" component={UserDropdownContainer} />
    </header>
  </div>
);
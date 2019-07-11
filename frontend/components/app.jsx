import React from "react";
import { Redirect, Switch } from "react-router-dom";
import Modal from "./modal";
import LoginContainer from "./session/login_container";
import SignupContainer from "./session/signup_container";
import NavContainer from "../components/nav/nav_container";
import HeaderContainer from "../components/header/header_container";
import UserDropdownContainer from "../components/user/user_dropdown_container"
import Protected from './protected';

import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <AuthRoute path="/" component={SignupContainer} />
      <Redirect to="/signup" />
    </Switch>
    <ProtectedRoute path="/:workspaceId" component={Protected} />

    {/* <ProtectedRoute exact path="/:workspaceId/" component={LoggedInViewContainer} /> */}
    {/* <ProtectedRoute exact path="/:workspaceId/:projectId" component={LoggedInViewContainer} /> */}
    {/* /:workspaceId(first available to user)/home display everything + home */}
    {/* <ProtectedRoute path="/:workspaceId/:projectId" component={} /> */}
  </div>
);

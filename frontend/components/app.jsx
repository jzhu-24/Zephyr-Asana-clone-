import React from "react";
import { Redirect, Switch } from "react-router-dom";
import LoginContainer from "./session/login_container";
import SignupContainer from "./session/signup_container";
import Protected from './protected';

import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default () => (
  <div>
    <ProtectedRoute path="/:workspaceId" component={Protected} />
    <Switch>
      <AuthRoute exact path="/login" component={LoginContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <AuthRoute path="/" component={SignupContainer} />
      <Redirect to="/signup" />
    </Switch>
  </div>
);

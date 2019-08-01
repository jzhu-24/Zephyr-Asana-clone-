import React from "react";
import { Redirect, Switch } from "react-router-dom";
import LoginContainer from "./session/login_container";
import SignupContainer from "./session/signup_container";
import Protected from './protected';

import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <AuthRoute path="/" component={SignupContainer} />
    </Switch>
    <ProtectedRoute path="/:workspaceId" component={Protected} />
  </div>
);

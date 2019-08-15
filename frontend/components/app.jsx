import React from "react";
import { Switch } from "react-router-dom";
import LoginContainer from "./session/login_container";
import SignupContainer from "./session/signup_container";
import ProtectedContainer from './protected_container';

import { AuthRoute, ProtectedRoute } from "../util/route_util";

export default () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <AuthRoute path="/" component={SignupContainer} />
    </Switch>
    <ProtectedRoute path="/:workspaceId?/:projectId?/:taskId?" component={ProtectedContainer} />
  </div>
);

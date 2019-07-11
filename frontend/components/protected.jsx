import React from "react";
import Modal from "./modal";
import NavContainer from "../components/nav/nav_container";
import HeaderContainer from "../components/header/header_container";
import Home from "../components/home"
import UserDropdownContainer from "../components/user/user_dropdown_container"
import ColumnIndexContainer from "../components/columns/column_index_container";

import { ProtectedRoute } from "../util/route_util";


// ??? optional param via ?
export default () => (
  <div className="protected" id="logged-in-view">
    <ProtectedRoute path="/:workspaceId" component={Modal} />
    <ProtectedRoute path="/:workspaceId" component={NavContainer} />
    <div className="main-container">
      <div className="header-container">
        <ProtectedRoute
          path="/:workspaceId?/:projectId?"
          component={HeaderContainer}
        />
        <ProtectedRoute
          path="/:workspaceId?/:projectId?"
          component={UserDropdownContainer}
        />
      </div>
      <ProtectedRoute path="/0" component={Home} />
      <div className="column-container">
        <ProtectedRoute
          path="/:workspaceId/:projectId"
          component={ColumnIndexContainer}
        />
      </div>
    </div>
  </div>
);
import React from 'react';
import { Redirect, Switch, withRouter } from "react-router-dom";
import Modal from './modal';
import NavContainer from './nav/nav_container';
import HeaderContainer from './header/header_container';
import ProjectHome from './projects/project_home_container';
import Home from './home';
import UserDropdownContainer from './user/user_dropdown_container'
import ColumnIndexContainer from './columns/column_index_container';
import { ProtectedRoute } from '../util/route_util';


class Protected extends React.Component {
  componentDidMount() {
    this.props.requestWorkspaces();
  }

  render() {
    const { workspaceIds, workspaceId } = this.props;

    if (workspaceIds.length !== 0 && !workspaceIds.includes(workspaceId)) {
      const firstWorkspaceId = workspaceIds[0];

      return (
        <Redirect to={firstWorkspaceId} />
      );
    }

    return (
      <div className="protected" id="logged-in-view">
        <ProtectedRoute path="/:workspaceId?/:projectId?/:taskId?" component={Modal} />
        <ProtectedRoute path="/:workspaceId" component={NavContainer} />
        <div className="main-container">
          <div className="header-container">
            <ProtectedRoute
              path="/:workspaceId?/:projectId?"
              component={HeaderContainer}
            />
            <ProtectedRoute
              path="/:workspaceId"
              component={UserDropdownContainer}
            />
          </div>
          <Switch>
            <ProtectedRoute
              path="/:workspaceId/:projectId"
              component={ColumnIndexContainer}
            />
            <ProtectedRoute path="/:workspaceId" component={ProjectHome} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(Protected);

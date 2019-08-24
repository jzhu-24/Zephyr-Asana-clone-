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
import { toggleDropdown } from '../event_listeners/toggle_dropdown';

class Protected extends React.Component {
  componentDidMount() {
    const { workspaceId } = this.props.match.params;
    const { requestProjects, requestProjectFavorites, requestWorkspaces, requestUsers } = this.props;

    requestProjects(workspaceId);
    requestProjectFavorites(workspaceId);
    requestWorkspaces();
    requestUsers();
    document.addEventListener('keydown', toggleDropdown);
    document.addEventListener('click', toggleDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', toggleDropdown);
    document.removeEventListener('click', toggleDropdown);
  }

  render() {
    const { workspaceIds, workspaceId, match } = this.props;

    if (workspaceIds.length !== 0 && !workspaceIds.includes(workspaceId)) {
      const firstWorkspaceId = workspaceIds[0];

      return (
        <Redirect to={firstWorkspaceId} />
      );
    }

    return (
      <div className="protected" id="logged-in-view">
        <ProtectedRoute path="/:workspaceId?/:projectId?/:taskId?" component={Modal} />
        {/* <ProtectedRoute path="/:workspaceId" component={NavContainer} /> */}
        <NavContainer match={match} />
        <div className="main-container">
          <div className="header-container">
            <HeaderContainer match={match} />
            <UserDropdownContainer />
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

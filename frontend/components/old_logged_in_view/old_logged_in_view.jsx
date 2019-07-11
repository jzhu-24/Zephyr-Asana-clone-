import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../header/header';
import UserDropdown from '../user/user_dropdown';
import { ProtectedRoute } from "../../util/route_util";

class LoggedInView extends React.Component {

  componentDidMount() {
    this.props.requestWorkspaces()
    this.props.requestProjects()
  }

  render() {
    // ??? render (must have conditional) -> componentDidMount
    if (this.props.currentWorkspace === undefined) return null;
    
    return (
      <div className="logged_in_view">
        <header className='header'>
          <Header 
            currentProject={this.props.currentProject} />
          <UserDropdown 
            workspaces={this.props.workspaces}
            deleteWorkspace={this.props.deleteWorkspace}
            logout={this.props.logout}
            currentWorkspace={this.props.currentWorkspace} />
        </header>
      </div>
    );
  };
};

export default withRouter(LoggedInView);
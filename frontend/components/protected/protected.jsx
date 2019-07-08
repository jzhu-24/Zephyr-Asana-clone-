import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Nav from '../nav/nav';
import WorkspaceHeader from '../workspaces/workspace_header';
import UserDropdown from '../user/user_dropdown';
import WorkspaceCreateFormContainer from '../workspaces/workspace_create_form_container';
import WorkspaceEditFormContainer from '../workspaces/workspace_edit_form_container';


class Protected extends React.Component {

  componentDidMount() {
    this.props.requestWorkspaces()
  }

  render() {
    // ??? render (must have conditional) -> componentDidMount
    if (this.props.currentWorkspace === undefined) return null;
    
    return (
      <div className="protected">
        <Nav 
          currentWorkspace={this.props.currentWorkspace} />
        <header className='header'>
          <WorkspaceHeader 
            currentWorkspace={this.props.currentWorkspace} />
          <UserDropdown 
            workspaces={this.props.workspaces}
            deleteWorkspace={this.props.deleteWorkspace}
            logout={this.props.logout}
            currentWorkspace={this.props.currentWorkspace} />
        </header>
        <WorkspaceCreateFormContainer />
        <WorkspaceEditFormContainer 
          workspaces={this.props.workspaces}
          currentWorkspace={this.props.currentWorkspace} />
      </div>
    );
  };
};

export default withRouter(Protected);
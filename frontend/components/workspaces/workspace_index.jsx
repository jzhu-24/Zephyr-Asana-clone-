import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class WorkspaceIndex extends React.Component {

  render() {
    return (
      <div>
        <Link to="/" >Signup</Link>
        <Link to="/login" >Login</Link>
        <button className="logout-button" onClick={this.props.logout}>Log Out</button>
      </div>
    )
  }
}

export default withRouter(WorkspaceIndex);
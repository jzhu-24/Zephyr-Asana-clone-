import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { currentProject } = this.props;

    const title = currentProject ? currentProject.name : 'Home';

    return (
      <div className="header">
        <p className="workspace-nav-title">{title}</p>
      </div>
    );
  }
}

export default withRouter(Header);

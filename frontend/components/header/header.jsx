import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  componentDidMount() {
    this.props.requestProject(this.props.match.params.projectId);
  }

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

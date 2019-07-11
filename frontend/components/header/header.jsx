import React from "react";
import { Link, withRouter } from "react-router-dom";
import UserDropdownContainer from "../../components/user/user_dropdown_container";

class Header extends React.Component {
  componentDidMount() {
    this.props.requestProject(this.props.match.params.projectId);
  }

  render() {
    const title = this.props.currentProject
      ? this.props.currentProject.name
      : "Home";
    return (
      <div className="header">
        <p className="workspace-nav-title">{title}</p>
      </div>
    );
  }
}

export default withRouter(Header);

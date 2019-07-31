import React from "react";
import { Link, withRouter } from "react-router-dom";

class ProjectIndex extends React.Component {
  
  componentDidMount() {
    this.props.requestProjects(this.props.match.params.workspaceId);
  }

  render() {  
    const projects = this.props.projects.map(project => {
      return (
        <div className="nav-project-row" key={project.id}>
          <Link to={`/${project.workspace_id}/${project.id}`}>
            <div>{project.name}</div>
          </Link>
        </div>
      );
    });

    return (
      <div className="nav-project-index">
        {projects}
      </div>
    );
  }
}

export default withRouter(ProjectIndex);

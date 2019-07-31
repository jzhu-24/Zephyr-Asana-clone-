import React from "react";
import { Link, withRouter } from "react-router-dom";

class ProjectHome extends React.Component {
  componentDidMount() {
    this.props.requestProjects(this.props.match.params.workspaceId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.workspaceId !== this.props.match.params.workspaceId) {
      this.props.requestProjects(this.props.match.params.workspaceId);
    }
  }

  render() {
    const { createProject } = this.props;

    const projects = this.props.projects.map(project => {
      return (
        <div className="project" key={project.id}>
          <Link to={`/${project.workspace_id}/${project.id}`}>
            <div className="project-tile"></div>
            <div className="project-name">{project.name}</div>
          </Link>
        </div>
      );
    });

    return (
      <div className="project-home">
        <div className="project-title">Recent Projects</div>

        <div className="project-index-border"></div>
        
        <div className="project-index">
          {projects}
        <div className="project new-project" onClick={() => createProject()}>
          <div>
            <div className="new-project-tile">+</div>
            <div className="project-name">New Project</div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectHome);

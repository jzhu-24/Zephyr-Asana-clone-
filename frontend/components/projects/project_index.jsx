import React from "react";
import { Link, withRouter } from "react-router-dom";
import ProjectIndexItem from "./project_index_item";

class ProjectIndex extends React.Component {
  
  
  componentDidMount() {
    this.props.requestProjects();
  }

  render() {
    if (this.props.projects.length === 0) return null;

    const projects = this.props.projects.map(project => {
      return (
        <ProjectIndexItem
          key={project.id}
          project={project} />
      );
    });

    return (
      <div className="project-index">
        {projects}
      </div>
    );
  }
}

export default withRouter(ProjectIndex);

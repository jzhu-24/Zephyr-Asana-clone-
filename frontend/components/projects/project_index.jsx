import React from "react";
import { Link, withRouter } from "react-router-dom";

function ProjectIndex(props) {  
  if (!props || props.projects.length === 0 || !props.projects[0]) return null;
  
  const projects = props.projects.map(project => {
    return (
      <div className="nav-project-row" key={project.id}>
        <Link to={`/${project.workspace_id}/${project.id}`}>
          <div className="nav-project-name">
            {project.name}
          </div>
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

export default withRouter(ProjectIndex);

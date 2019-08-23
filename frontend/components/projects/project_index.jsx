import React from "react";
import { Link, withRouter } from "react-router-dom";
import Calendar from 'react-calendar';

function ProjectIndex(props) {  
  if (!props || props.projects.length === 0 || !props.projects[0]) return null;
  
  const { editProject, deleteProject } = props;

  const projects = props.projects.map(project => {
    return (
      <div className="nav-project-row" key={project.id}>
        <Link to={`/${project.workspace_id}/${project.id}`}>
          <div className="nav-project-tile" />
          <div className="nav-project-name">
            {project.name}
          </div>
        </Link>
        <div className={`nav-project-ellipsis ${project.id}`}>
          ...
          <div className={`nav-project-dropdown ${project.id}`}>
            <div className="nav-project-dropdown-item" onClick={() => editProject(project.id)}>Edit Project</div>
            <div className="nav-project-dropdown-item" onClick={() => deleteProject(project.id)}>Delete Project</div>
          </div>
        </div>
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

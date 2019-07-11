import React from 'react';
import { Link } from 'react-router-dom';

class ProjectIndexItem extends React.Component {

  render() {   
    return (
      <Link to={`/${this.props.project.workspace_id}/${this.props.project.id}`} className="nav-project-row">
        <p>{this.props.project.name}</p>
      </Link>
    )
  };
};

export default ProjectIndexItem;
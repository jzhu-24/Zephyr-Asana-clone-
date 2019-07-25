import React from 'react';
import { Link } from 'react-router-dom';

class ProjectIndexItem extends React.Component {

  render() {   
    return (
      <div className="nav-project-row">
        <Link to={`/${this.props.project.workspace_id}/${this.props.project.id}`} >
          <div>
            {this.props.project.name}
          </div> 
        </Link>
      </div>
    );
  };
};

export default ProjectIndexItem;
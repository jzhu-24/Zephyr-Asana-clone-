import React from 'react';
import { Link } from 'react-router-dom';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class WorkspaceIndexItem extends React.Component {

  render() {    
    // ??? conditional view
    let faCheckIcon = <div className="user-dropdown-check"></div>;
    
    if (this.props.workspace.id === parseInt(this.props.currentWorkspaceId)) {
      faCheckIcon = <FontAwesomeIcon icon={faCheck} className="user-dropdown-check"/>
    }

    return (
      <Link to={`/${this.props.workspace.id}`} className="user-dropdown-row user-dropdown-workspace">
        <div className="user-dropdown-check-container">
          {faCheckIcon}
        </div>
        <p>{this.props.workspace.name}</p>
      </Link>
    )
  };
};

export default WorkspaceIndexItem;

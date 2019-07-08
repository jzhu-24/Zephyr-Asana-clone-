import React from 'react';
import { Link } from 'react-router-dom';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ??? fontawesome importing

class WorkspaceIndexItem extends React.Component {

  render() {    
    // ??? conditional view
    let faCheckIcon = <div></div>;

    if (this.props.workspace.id === parseInt(this.props.currentWorkspace.id)) {
      faCheckIcon = <FontAwesomeIcon icon={faCheck} className="user-dropdown-check"/>
    }

    return (
      <Link to={`/${this.props.workspace.id}`} className="user-dropdown-row">
        {faCheckIcon}
        <p>{this.props.workspace.name}</p>
      </Link>
    )
  };
};

export default WorkspaceIndexItem;
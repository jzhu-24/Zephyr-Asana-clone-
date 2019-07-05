import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceIndexItem = ({ workspace, deleteWorkspace }) => {  
  // const deleteWorkspaceAction = () => deleteWorkspace(workspace.id)

  return (
    <li>
      <Link to={`/${workspace.id}`}>{workspace.name}</Link>
      {/* <button onClick={deleteWorkspaceAction}>Delete</button> */}
    </li>
  )
};

export default WorkspaceIndexItem;
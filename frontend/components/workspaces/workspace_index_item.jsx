import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceIndexItem = ({ workspace }) => {  
  return (
    <div>
      <Link to={`/${workspace.id}`}>{workspace.name}</Link>
    </div>
  )
};

export default WorkspaceIndexItem;
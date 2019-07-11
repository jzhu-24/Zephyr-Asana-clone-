import React from 'react';

class TaskIndexItem extends React.Component {

  render() {   
    if (this.props.task === undefined) return null;

    return (
      <div className="task">
        <p className="task-name">{this.props.task.name}</p>
      </div>
    )
  };
};

export default TaskIndexItem;
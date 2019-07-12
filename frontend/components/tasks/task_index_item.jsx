import React from 'react';
import { openModal } from "../../actions/modal_actions";
import { Link } from 'react-router-dom';

class TaskIndexItem extends React.Component {
  render() {
    if (this.props.task.name === undefined) return null;
    return (
      <div className="task" onClick={this.props.editTask}>
        <p className="task-name">{this.props.task.name}</p>
      </div>
    );
  }
};

export default TaskIndexItem;
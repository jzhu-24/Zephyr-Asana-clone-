import React from "react";
import { Link, withRouter } from "react-router-dom";
import TaskIndexItem from "./task_index_item";

class TaskIndex extends React.Component {
  
  componentDidMount() {
    this.props.requestTasks(this.props.currentColumn.id);
  }

  render() {
    if (this.props.tasksArray.length === 0) return null;

    const tasks = this.props.tasksArray.map(taskId => {
      return (
        <TaskIndexItem
          key={taskId}
          task={this.props.tasks[taskId]} />
      );
    });

    return (
      <div className="task-index">
        {tasks}
      </div>
    );
  }
}

export default withRouter(TaskIndex);

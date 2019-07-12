import React from "react";
import { Link, withRouter } from "react-router-dom";
import TaskIndexItem from "./task_index_item";
import { Draggable } from "react-beautiful-dnd";
 
class TaskIndex extends React.Component {
  render() {
    if (this.props.column.task === undefined) return null;

    return (
      <div className="task-index">
        {this.props.column.task.map((taskId, index) => (
          <Draggable draggableId={taskId} index={index}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskIndexItem
                  key={taskId}
                  task={this.props.tasks[taskId]}
                  editTask={this.props.editTask}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    );
  }
}

export default withRouter(TaskIndex);

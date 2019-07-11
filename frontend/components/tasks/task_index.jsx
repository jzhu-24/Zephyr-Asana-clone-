import React from "react";
import { Link, withRouter } from "react-router-dom";
import TaskIndexItem from "./task_index_item";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
 
class TaskIndex extends React.Component {
  
  componentDidMount() {
    this.props.requestTasks(this.props.column.id);
  }

  render() {
    if (Object.keys(this.props.tasks).length === 0) return null;

    return (
      <div className="task-index">
        {this.props.tasksArray.map((taskId, index) => (
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

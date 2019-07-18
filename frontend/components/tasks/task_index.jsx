import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
 
class TaskIndex extends React.Component {
  render() {
    let { column, tasks, editTask } = this.props;

    return (
      <div className="task-index">
        {column.task.map((taskId, index) => (
          <Draggable draggableId={taskId} index={index}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="task" onClick={editTask}>
                  <p className="task-name">{tasks[taskId].name}</p>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    );
  }
}

export default withRouter(TaskIndex);

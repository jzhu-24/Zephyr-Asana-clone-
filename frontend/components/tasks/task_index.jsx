import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(taskId) {
    const workspaceId = this.props.match.params.workspaceId;
    const projectId = this.props.match.params.projectId;
    this.props.history.push(`/${workspaceId}/${projectId}/${taskId}`);
    this.props.editTask(this.props.tasks[taskId]);
  }

  render() {
    let { column, tasks } = this.props;

    if (Object.keys(tasks).length === 0 || !column) return null;

    return (
      <div className="task-index">
        {column.task.map((taskId, index) => (
          <Draggable draggableId={taskId} index={index} key={taskId}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div
                  className={ tasks[taskId].completed ? "completed task" : "task"}
                  onClick={() => this.handleClick(taskId)}
                >
                  {tasks[taskId].completed === true ? (
                    <FontAwesomeIcon icon={faCheckCircle} className="task-check" />
                  ) : (<div></div>)}
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

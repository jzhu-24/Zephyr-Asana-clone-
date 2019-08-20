import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import TaskIndexDate from './task_index_date';

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
    let { column, tasks, updateTask, handleDeleteTask, match, editTask } = this.props;

    if (Object.keys(tasks).length === 0 || !column) return null;

    column.task.forEach(taskId => {
      if (!tasks[taskId]) {
        return null;
      }
    });

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
                <div onClick={() => this.handleClick(taskId)} className={tasks[taskId] && tasks[taskId].completed ? 'completed task' : 'task'}>
                  <div>
                    <div className="task-header">
                      {(tasks[taskId] && tasks[taskId].completed) && <FontAwesomeIcon icon={faCheckCircle} className="task-check" />}
                      <p className={tasks[taskId] && tasks[taskId].completed ? 'task-name-completed' : 'task-name'}>{tasks[taskId] && tasks[taskId].name}</p>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    className="task-delete"
                    icon={faTrash}
                    onClick={(e) => handleDeleteTask(tasks[taskId], e)}
                  />
                  {tasks[taskId] && <TaskIndexDate updateTask={updateTask} task={tasks[taskId]} className="task-index" />}
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

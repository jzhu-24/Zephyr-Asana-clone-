import React from "react";
import { withRouter } from "react-router-dom";
import { faEllipsisV, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskIndexDate from './task_index_date';

class SubtaskIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      tasks: { ...this.props.tasks },
    };

    this.subtaskEventListeners = this.subtaskEventListeners.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.toggleActiveSubtask = this.toggleActiveSubtask.bind(this);
    this.deleteSubtask = this.deleteSubtask.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.subtaskEventListeners);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.subtaskEventListeners);
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.tasks).length !== Object.keys(this.props.tasks).length) {
      const { task, tasks } = this.props;
      const updatedTask = tasks[task.id];

      this.setState({ task: updatedTask, tasks });
    }
  }

  subtaskEventListeners(e) {
    const activeTaskElement = document.activeElement;
    const subtaskId = Number(activeTaskElement.classList[1]);
    
    if (e.keyCode == 8 && subtaskId && activeTaskElement.value.length === 0) {
      this.deleteSubtask(subtaskId);
    } else if (e.keyCode == 40 || e.keyCode == 38) {
      this.toggleActiveSubtask(subtaskId, e.keyCode);
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const { updateTask } = this.props;
    const { task } = this.state;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newSubaskIds = task.subtask;
    newSubaskIds.splice(source.index, 1);
    newSubaskIds.splice(destination.index, 0, draggableId);

    const newTask = {
      ...task,
      subtask: newSubaskIds
    };

    const newState = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [newTask.id]: newTask
      }
    };

    this.setState({ newState }, () => updateTask(newTask));
  }

  handleInput(id) {
    // combine handleInput and toggleCompleted?
    return e => {
      const { updateTask } = this.props;
      const { tasks } = this.state;
      tasks[id].name = e.target.value;

      this.setState({ tasks }, () => updateTask(tasks[id]));
    };
  }

  toggleCompleted(id) {
    const { updateTask } = this.props;
    const { tasks } = this.state;

    tasks[id].completed = !tasks[id].completed
    
    this.setState({ tasks }, () => updateTask(tasks[id]));
  }

  toggleActiveSubtask(subtaskId, direction) {
    const subtask = this.state.task.subtask;
    const newDirection = direction - 39;
    const newIndex = subtask.indexOf(subtaskId) + newDirection;
    const newActiveSubtaskId = subtask[newIndex];

    if (newActiveSubtaskId && newIndex <= subtask.length - 1) {
      const newActiveSubtaskElement = document.getElementsByClassName(`task-edit-subtask-name ${newActiveSubtaskId}`)[0]
      newActiveSubtaskElement.focus();
    }
  }

  deleteSubtask(subtaskId) {
    const { deleteTask, updateTask } = this.props;
    const { task } = this.state;
    const updatedTask = task;
    const index = updatedTask.subtask.indexOf(subtaskId);
    const prevSubtaskId = updatedTask.subtask[index - 1] || 0;

    updatedTask.subtask.splice(index, 1);
    
    this.setState({ task: updatedTask }, () => {
      updateTask(updatedTask);
      deleteTask(subtaskId).then(result => {
        this.toggleActiveSubtask(prevSubtaskId, 39);
      });
    })
  }

  render() {
    const { task, tasks } = this.state;
    const { updateTask, createSubtask } = this.props;

    let subtasks = task.subtask.map((subtaskId, index) => {
      if (tasks[subtaskId]) return (
        <Draggable draggableId={subtaskId} index={index} key={subtaskId}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="task-edit-subtask" key={subtaskId}>
                  <div className="task-edit-subtask-drag">
                    <FontAwesomeIcon icon={faEllipsisV} className="task-edit-subtask-dragger" />
                    <FontAwesomeIcon icon={faEllipsisV} className="task-edit-subtask-dragger" />
                  </div>
                  <FontAwesomeIcon 
                    icon={faCheckCircle} 
                    className={tasks[subtaskId].completed ? 'task-edit-subtask-complete' : 'task-edit-subtask-incomplete' } 
                    onClick={() => this.toggleCompleted(subtaskId)}
                  />
                  <form className="task-edit-subtask-form" onSubmit={() => document.activeElement.tagName === "INPUT" && createSubtask("subtask")}>
                    <input 
                      onChange={this.handleInput(subtaskId)}
                      type="text" 
                      value={tasks[subtaskId].name} 
                      className={tasks[subtaskId].completed ? `task-edit-subtask-name ${subtaskId} completed` : `task-edit-subtask-name ${subtaskId}` }/>
                  </form>
                  <TaskIndexDate updateTask={updateTask} task={tasks[subtaskId]} className="task-edit-subtask" />
                </div>
              </div>
            )}
        </Draggable>
      )
    })

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={task.id} type="task">
          {provided => (
            <div
              className="task-edit-subtask-droppable"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >        
            
              <div className="task-edit-subtasks">
                {subtasks}
              </div>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default withRouter(SubtaskIndex);

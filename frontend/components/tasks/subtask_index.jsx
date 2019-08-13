import React from "react";
import { withRouter } from "react-router-dom";
import { faEllipsisV, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class SubtaskIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      tasks: { ...this.props.tasks },
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.tasks).length !== Object.keys(this.props.tasks).length) {
      const { task, tasks } = this.props;
      this.setState({ task, tasks });
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const { task, updateTask } = this.props;

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

  enterPressed = e => {
    if (e.charCode === 13) {
      // create new task + change focus
    }
  };

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
    const { tasks, updateTask } = this.props;
    const subtask = tasks[id];
    subtask.completed = !subtask.completed;
    updateTask(subtask);
  }

  render() {
    const { task, tasks } = this.state;

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
                  <input 
                    onChange={this.handleInput(subtaskId)}
                    type="text" 
                    value={tasks[subtaskId].name} 
                    className={tasks[subtaskId].completed ? 'task-edit-subtask-name completed' : 'task-edit-subtask-name' }/>
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

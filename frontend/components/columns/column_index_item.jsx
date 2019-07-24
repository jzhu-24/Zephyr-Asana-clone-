import React from 'react';
import TaskIndex from '../tasks/task_index';
import TaskIndexContainer from '../tasks/task_index_container';
import TaskCreateFormContainer from '../tasks/task_create_form_container';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class ColumnIndexItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.enterPressed = this.enterPressed.bind(this);
  }

  enterPressed = e => {
    if (e.charCode === 13) {
      this.props.handleSubmit('EDIT_COLUMN', this.props.columnId);
    }
  }

  render() {
    const {
      column,
      columnId,
      index,
      tasks,
      displayEditColumnForm,
      displayCreateTaskForm,
      handleDeleteColumn,
      toggleForm,
      handleInput,
      handleSubmit,
      newTasks
    } = this.props;
    
    let editForm;
    
    if (column !== undefined) {
      if (!displayEditColumnForm[columnId]) {
        editForm = (
          <p
            className="column-name"
            onClick={() => toggleForm("EDIT_COLUMN", columnId)}
          >
            {column.name}
          </p>
        );
      } else {
        editForm = (
          <form>
            <input
              className="edit-column-input"
              type="text"
              value={column.name}
              onChange={handleInput("EDIT_COLUMN", columnId)}
              onKeyPress={this.enterPressed}
              onBlur={() => handleSubmit("EDIT_COLUMN", columnId)}
              autoFocus
            />
          </form>
        );
      }
    }

    return (
      <Draggable draggableId={columnId} index={index}>
        {provided => (
          <div
            className="column-draggable"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="column">
              <div className="column-header" {...provided.dragHandleProps}>
                {editForm}
                <FontAwesomeIcon
                  className="column-delete-button"
                  icon={faTrash}
                  onClick={() => handleDeleteColumn(columnId)}
                />
              </div>
              <TaskCreateFormContainer
                columnId={columnId}
                newTasks={newTasks}
                toggleForm={toggleForm}
                displayCreateTaskForm={displayCreateTaskForm[columnId]}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
              />

              <Droppable droppableId={columnId} type="task">
                {provided => (
                  <div
                    className="column-droppable"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TaskIndex
                      column={column}
                      tasks={tasks}
                      editTask={this.props.editTask}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ColumnIndexItem;

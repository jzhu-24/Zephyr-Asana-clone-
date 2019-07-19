import React from 'react';
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
      this.props.handleColumnSubmit('EDIT', this.props.columnId);
    }
  }

  render() {
    let editForm;
    let {
      column,
      columnId,
      index,
      tasks,
      displayEditForm,
      handleDeleteColumn,
      toggleColumnForm,
      handleColumnInput,
      handleColumnSubmit
    } = this.props;

    if (!displayEditForm[columnId]) {
      editForm = (
        <p
          className="column-name"
          onClick={() => toggleColumnForm("EDIT", columnId)}
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
            onChange={handleColumnInput("EDIT", columnId)}
            onKeyPress={this.enterPressed}
            onBlur={() => handleColumnSubmit("EDIT", columnId)}
            autoFocus
          />
        </form>
      );
    }

    return (
      <Draggable
        draggableId={columnId}
        index={index}
      >
        {provided => (
          <div
            className='column-draggable'
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className='column'>
              <div className='column-header' {...provided.dragHandleProps}>
                {editForm}
                <FontAwesomeIcon
                  className='column-delete-button'
                  icon={faTrash}
                  onClick={() => handleDeleteColumn(columnId)}
                />
              </div>
              <TaskCreateFormContainer column={column} />

              <Droppable droppableId={columnId} type='task'>
                {provided => (
                  <div
                    className='column-droppable'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TaskIndexContainer
                      column={column}
                      tasks={tasks}
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

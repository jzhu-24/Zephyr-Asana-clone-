import React from "react";
import TaskIndexContainer from "../tasks/task_index_container";
import TaskCreateFormContainer from "../tasks/task_create_form_container";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable, Draggable } from "react-beautiful-dnd";

class ColumnIndexItem extends React.Component {
  render() {
    let editForm;
    let {
      column,
      columnId,
      index,
      tasks,
      displayEditForm,
      handleDeleteColumn,
      toggleEditColumn,
      handleEditColumn,
      handleEditColumnSubmit
    } = this.props;

    if (displayEditForm[columnId] === false) {
      editForm = (
        <p className="column-name" onClick={() => toggleEditColumn(columnId)}>
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
            onChange={handleEditColumn(columnId)}
            onSubmit={() => handleEditColumnSubmit(columnId)}
            onBlur={() => handleEditColumnSubmit(columnId)}
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
              <TaskCreateFormContainer column={column} />

              <Droppable droppableId={columnId} type="task">
                {provided => (
                  <div
                    className="column-droppable"
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

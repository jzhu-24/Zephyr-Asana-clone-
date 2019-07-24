import React from "react";

class ColumnCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.enterPressed = this.enterPressed.bind(this);
  }

  enterPressed = e => {
    if (e.charCode === 13) {
      this.props.handleSubmit('CREATE_COLUMN');
    }
  };

  render() {
    const {
      newColumn,
      toggleForm,
      handleInput,
      displayCreateColumnForm,
      handleSubmit
    } = this.props;

    let createForm;
    if (!displayCreateColumnForm) {
      createForm = (
        <label
          className="add-column-button"
          onClick={() => toggleForm("CREATE_COLUMN")}
        >
          + Add column
        </label>
      );
    } else {
      createForm = (
        <form>
          <input
            size="4"
            className="add-column-input"
            type="text"
            placeholder="New Column"
            value={newColumn.name}
            onChange={handleInput("CREATE_COLUMN")}
            onKeyPress={this.enterPressed}
            onBlur={() => handleSubmit('CREATE_COLUMN')}
            autoFocus
          />
        </form>
      );
    }

    return <div className="add-column-container">{createForm}</div>;
  }
}

export default ColumnCreateForm;

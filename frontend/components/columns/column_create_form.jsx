import React from "react";

class ColumnCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.enterPressed = this.enterPressed.bind(this);
  }

  enterPressed = e => {
    if (e.charCode === 13) {
      this.props.handleColumnSubmit('CREATE');
    }
  };

  render() {
    const {
      newColumn,
      toggleColumnForm,
      handleColumnInput,
      displayCreateForm,
      handleColumnSubmit
    } = this.props;

    let createForm;
    if (displayCreateForm === false) {
      createForm = (
        <label
          className="add-column-button"
          onClick={() => toggleColumnForm("CREATE")}
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
            onChange={handleColumnInput("CREATE")}
            onKeyPress={this.enterPressed}
            onBlur={() => handleColumnSubmit('CREATE')}
            autoFocus
          />
        </form>
      );
    }

    return <div className="add-column-container">{createForm}</div>;
  }
}

export default ColumnCreateForm;

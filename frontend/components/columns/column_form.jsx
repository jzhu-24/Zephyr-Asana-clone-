import React from "react";

class ColumnForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      column: this.props.column,
      displayCreateForm: false
    };

    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  componentDidUpdate() {
    if (this.state.displayCreateForm) this.handleForm();
  }

  handleInput(type) {
    return e => {
      this.setState({ 
        column: { [type]: e.target.value,
        project_id: this.state.column.project_id }});
    };
  }

  handleForm() {
    const input = document.getElementsByClassName("add-column-input")[0];  
    let that = this;

    window.onclick = e => {
      if (e.target.classList.value === "add-column-button") {
        return null;
      } else if (e.target == input) {
        return null;
      } else {
        this.setState({
          displayCreateForm: !this.state.displayCreateForm
        });
        that.handleSubmit();
      }
    }
  }

  handleSubmit() {
    const updatedProject = this.props.currentProject;
    this.props.action(this.state.column)
      .then(result => {
        updatedProject.column.push(result.column.id);
        this.props.updateProject(updatedProject);
      }
    )
  }

  toggleInput() {
    this.setState({displayCreateForm: !this.state.displayCreateForm})
  }

  render() {
    let createForm;
    if (this.state.displayCreateForm === false) {
      createForm = (
        <label className="add-column-button" onClick={this.toggleInput}>
          + Add column
        </label>
      );
    } else {
      createForm = (
        <form>
          <input
            placeholder="New Column"
            className="add-column-input"
            type="text"
            value={this.state.name}
            onChange={this.handleInput("name")}
          />
        </form>
      );
    }

    return (
      <div className="add-column-container">
        {createForm}
      </div>
    )
  }
}

export default ColumnForm;

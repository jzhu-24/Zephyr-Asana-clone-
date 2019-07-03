import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit(e) {
    debugger
    e.preventDefault();
    this.props.createNewUser(this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="session-form">
        <h2>Sign Up!</h2>
        <form>
          <label>First Name:
            <input
              type="text"
              value={this.state.first_name}
              onChange={this.handleInput('first_name')}
            />
          </label>
          <label>Last Name:
            <input
              type="text"
              value={this.state.last_name}
              onChange={this.handleInput('last_name')}
            />
          </label>
          <label>Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput('email')}
            />
          </label>
          <label>Password:
            <input
              type="text"
              value={this.state.password}
              onChange={this.handleInput('password')}
            />
          </label>
          <button onClick={this.handleSubmit}>Sign Up!</button>
        </form>
      </div>
    )
  }
}

export default Signup;
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/'));
  }

  // renderErrors() {
  //   return (
  //     <ul>
  //       {this.props.errors.map((error, i) => (
  //         <li key={`error-${i}`}>
  //           {error}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    return (
      <div className="login">
        <form className="login-form">
          <h2>Log In</h2>
          {/* {this.renderErrors()} */}
          <label>Email Address:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput('email')}
            />
          </label>
          <label>Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}
            />
          </label>
          <div className="login-form-button-container">
            <Link to="/signup">
              <button className="login-form-button">
                <span>Demo Login</span>
              </button>
            </Link>
            <button onClick={this.handleSubmit} className="login-form-button">
              <span>Log In</span>
            </button>
          </div>
        </form>
        <div className="login-footer">
          <span>Don't have an account?</span>
          <Link className="btn" to="signup">
            <button className="login-footer-login-button">Log In</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
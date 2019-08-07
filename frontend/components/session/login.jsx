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
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.login({ email: "demo_user@gmail.com", password: "password" })
  }

  renderErrors() {
    if (this.props.errors.session.length !== 0) {
      return (
        <ul className="errors">
          {this.props.errors.session.map((error, i) => (
            <ul key={`error-${i}`}>
              {error}
            </ul>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="login">
        <div className="logo">
          <Link to="/">
            <img src={window.images.logo} alt="logo" className="logo-image" />
          </Link>
        </div>
        <form className="login-form">
          <h2>Log In</h2>
            {this.renderErrors()}
          <label>Email Address
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput('email')}
            />
          </label>
          <label>Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}
            />
          </label>
          <div className="login-form-button-container">
            <button className="login-form-button" onClick={this.demoLogin}>
              <p>Demo Login</p>
            </button>
            <button onClick={this.handleSubmit} className="login-form-button">
              <p>Log In</p>
            </button>
          </div>
        </form>
        <div className="login-footer">
          <p>Don't have an account?</p>
          <Link id="btn" to="/signup">
            <button className="login-footer-button">Sign Up</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
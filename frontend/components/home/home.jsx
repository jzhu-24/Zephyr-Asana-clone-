import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="home">
    <Link className="btn" to="/signup">Sign Up</Link>
    <br></br>
    <Link className="btn" to="/login">Log In</Link>
  </div>
)
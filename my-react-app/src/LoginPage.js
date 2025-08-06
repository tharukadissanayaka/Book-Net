// src/Login.js
import React from 'react';
import './LoginPage.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">BookNet</h1>
        <h2 className="welcome-text">Welcome</h2>
        <p className="subtext">Unlock the stories!</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter Your Password" required />

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="or-divider">OR</div>

        <button className="google-button">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
          Continue with Google
        </button>

        <p className="signup-text">
          Don’t you have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Login() {

  return (
    <div className="container my-5">
      {/* Pills navs */}
      <ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-login-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-login"
            type="button"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-register-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-register"
            type="button"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >
            Register
          </button>
        </li>
      </ul>

      {/* Pills content */}
      <div className="tab-content" id="pills-tabContent">
        {/* Login Form */}
        <LoginForm />
        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
}

export default Login;


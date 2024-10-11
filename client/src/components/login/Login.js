import React from 'react';

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
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="pills-login-tab"
        >
          <form>
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>

            <p className="text-center">or:</p>

            {/* Email input */}
            <div className="form-outline mb-4">
              <input type="email" id="loginName" className="form-control" />
              <label className="form-label" htmlFor="loginName">
                Email or username
              </label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
              <input type="password" id="loginPassword" className="form-control" />
              <label className="form-label" htmlFor="loginPassword">
                Password
              </label>
            </div>

            {/* Remember me checkbox */}
            <div className="row mb-4">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
                  <label className="form-check-label" htmlFor="loginCheck">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="col-md-6 text-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            {/* Register redirect */}
            <div className="text-center">
              <p>
                Not a member? <a href="#!">Register</a>
              </p>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div
          className="tab-pane fade"
          id="pills-register"
          role="tabpanel"
          aria-labelledby="pills-register-tab"
        >
          <form>
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>

            <p className="text-center">or:</p>

            {/* Name input */}
            <div className="form-outline mb-4">
              <input type="text" id="registerName" className="form-control" />
              <label className="form-label" htmlFor="registerName">
                Name
              </label>
            </div>

            {/* Username input */}
            <div className="form-outline mb-4">
              <input type="text" id="registerUsername" className="form-control" />
              <label className="form-label" htmlFor="registerUsername">
                Username
              </label>
            </div>

            {/* Email input */}
            <div className="form-outline mb-4">
              <input type="email" id="registerEmail" className="form-control" />
              <label className="form-label" htmlFor="registerEmail">
                Email
              </label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
              <input type="password" id="registerPassword" className="form-control" />
              <label className="form-label" htmlFor="registerPassword">
                Password
              </label>
            </div>

            {/* Repeat Password input */}
            <div className="form-outline mb-4">
              <input type="password" id="registerRepeatPassword" className="form-control" />
              <label className="form-label" htmlFor="registerRepeatPassword">
                Repeat password
              </label>
            </div>

            {/* Terms and conditions checkbox */}
            <div className="form-check d-flex justify-content-center mb-4">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="registerCheck"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="registerCheck">
                I have read and agree to the terms
              </label>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-3">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

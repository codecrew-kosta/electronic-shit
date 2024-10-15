import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoginForm() {

  return (<>
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
  </>);
}

export default LoginForm;

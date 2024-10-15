import React, { useState } from 'react';
import { login, getProtectedData } from '../../services/authService'; // authService.js 가져오기


function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const handleLoginClick = async () => {
    try {
      let username = "";
      const { accessToken, csrfToken } = await login(username, password);
      setAccessToken(accessToken);
      setCsrfToken(csrfToken);
      alert('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  // 보호된 경로 접근
  const handleProtectedRequest = async () => {
    try {
      const data = await getProtectedData(accessToken, csrfToken);
      console.log('Protected data:', data);
    } catch (error) {
      console.error('Protected request failed:', error);
    }
  };

  return (<>
    {/* Login Form */}
    <div
      className="tab-pane fade show active"
      id="pills-login"
      role="tabpanel"
      aria-labelledby="pills-login-tab"
    >
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
        <input
          type="text"
          id="userId"
          className="form-control"
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <label className="form-label" htmlFor="userId">
          user ID
        </label>
      </div>

      {/* Password input */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <label className="form-label" htmlFor="password">
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
    </div>
  </>);
}

export default LoginForm;

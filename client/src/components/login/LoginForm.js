import React, { useState } from 'react';
import { login } from '../../services/authService'; // authService.js 가져오기
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기


function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLoginClick = async () => {
    try {
      const response = await login(userId, password);
      localStorage.setItem("username", response.username); // 로그인 성공 시 username 저장
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };


  // const refreshAccessToken = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3001/auth/token', {}, {
  //       withCredentials: true
  //     });
  //     const { accessToken } = response.data;
  //     localStorage.setItem('accessToken', accessToken); // 새로운 액세스 토큰 저장
  //     return accessToken;
  //   } catch (error) {
  //     console.error('Failed to refresh access token:', error);

  //     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
  //       // 리프레시 토큰이 없거나 만료된 경우 로그아웃 처리
  //       handleLogout();
  //     }
  //     return null;
  //   }
  // };

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
      <button type="submit" onClick={handleLoginClick} className="btn btn-primary btn-block mb-4">
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

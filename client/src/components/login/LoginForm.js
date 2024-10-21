import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';



function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  const { username, setUsername } = useContext(GlobalContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn, navigate]);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        { userId, password },
        { withCredentials: true }  // 쿠키 및 세션 정보 포함

      );
      console.log(response);

      // console.log(userId, username, userId, points);

      // }, { withCredentials: true });
      // 사용자 정보와 로그인 상태를 Local Storage에 저장
      // const sessionId = response.data.sessionId; // 세션 ID 저장
      // localStorage.setItem('sessionId', sessionId);
      sessionStorage.setItem("user", JSON.stringify(response.data))
      setUsername(response.data.username);
      // localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoggedIn(true);

      console.log("로그인폼", isLoggedIn);
      // console.log(sessionId)

      navigate("/");
    } catch (error) {
      console.error(error);
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

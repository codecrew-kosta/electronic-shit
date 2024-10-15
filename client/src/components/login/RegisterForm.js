import axios from 'axios';
import React, { useState } from 'react';

function RegisterForm() {

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const inputEventHandler = (e, setState) => {
    setState(e.target.value);
  }
  //2024_10_15_남윤호: 오류땜시 임시 생성
  const [getData, setData] = useState(null);
  const [getLoading, setLoading] = useState(null);
  const [getError, setError] = useState(null);

  
  const registerHandler = () => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/register', {
          username,
          userId,
          password,
          phoneNumber,
          email
        });
        console.log(response.data);
        alert("가입 완료");
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }


  return (<>
    {/* Register Form */}
    <div
      className="tab-pane fade"
      id="pills-register"
      role="tabpanel"
      aria-labelledby="pills-register-tab"
    >

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

      {/* Username input */}
      <div className="form-outline mb-4">
        <input type="text"
          id="registerUsername"
          className="form-control"
          value={username}
          onChange={e => { inputEventHandler(e, setUsername) }}
        />
        <label className="form-label" htmlFor="registerUsername">
          UserName
        </label>
      </div>

      {/* User ID input */}
      <div className="form-outline mb-4">
        <input type="text"
          id="registerUserId"
          className="form-control"
          value={userId}
          onChange={e => { inputEventHandler(e, setUserId) }}
        />
        <label className="form-label" htmlFor="registerUserId">
          User ID
        </label>
      </div>

      {/* Password input */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="registerPassword"
          className="form-control"
          value={password}
          onChange={e => { inputEventHandler(e, setPassword) }}
        />
        <label className="form-label" htmlFor="registerPassword">
          Password
        </label>
      </div>

      {/* Phone Number input */}
      <div className="form-outline mb-4">
        <input
          type="text"
          id="registerPhoneNumber"
          className="form-control"
          value={phoneNumber}
          onChange={e => { inputEventHandler(e, setPhoneNumber) }}
        />
        <label className="form-label" htmlFor="registerPhoneNumber">
          Phone Number
        </label>
      </div>

      {/* E-mail input */}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="registeremail"
          className="form-control"
          value={email}
          onChange={e => { inputEventHandler(e, setEmail) }}
        />
        <label className="form-label" htmlFor="registeremail">
          E-mail
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
      <button type="submit" onClick={registerHandler} className="btn btn-primary btn-block mb-3">
        Sign up
      </button>

    </div>
  </>);
}

export default RegisterForm;

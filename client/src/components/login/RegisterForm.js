import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RegisterForm() {

  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);

  //2024_10_15_남윤호: 오류땜시 임시 생성
  const [getData, setData] = useState(null);
  const [getLoading, setLoading] = useState(null);
  const [getError, setError] = useState(null);

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/register');
        setData(response.data);  // API에서 받은 데이터를 state에 저장
        setLoading(false);  // 데이터 로드 완료
      } catch (err) {
        setError(err.message);  // 에러 처리
        setLoading(false);  // 에러 발생 시 로딩 종료
      }
    }

    fetchData();
  }, []);

  return (<>
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
  </>);
}

export default RegisterForm;

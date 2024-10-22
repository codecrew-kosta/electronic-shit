import React from 'react';

const UserInfoCard = ({ userId, username, email, phoneNumber }) => (
  <div className="card mb-5">
    <div className="card-body">
      <h5 className="card-title">사용자 정보</h5>
      <p className="card-text">아이디: {userId}</p>
      <p className="card-text">닉네임: {username}</p>
      <p className="card-text">이메일: {email}</p>
      <p className="card-text">전화번호: {phoneNumber}</p>
      <a href="#!" className="btn btn-outline-dark mt-3">정보 수정</a>
    </div>
  </div>
);

export default UserInfoCard;



import React, { useEffect, useState } from 'react';
import UserInfoCard from './UserInfoCard';
import ProductCard from './ProductCard';
import ReviewList from './ReviewList';
import axios from 'axios';

const MyPage = () => {
  // const products = [
  //   { title: '스마트폰', description: '최신 스마트폰입니다.', price: 1200000 },
  //   { title: '노트북', description: '가벼운 휴대용 노트북입니다.', price: 2300000 },
  // ];

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {

    const getUserInfo = async () => {

      const sessionId = localStorage.getItem('sessionId');

      try {
        const response = await axios.get(`http://localhost:3001/mypage/userinfo`);
        console.log(response.data);

        setUserId(response.data.userId)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setPhoneNumber(response.data.phoneNumber)

      } catch (error) {
        console.error(error);
      }
    }
    getUserInfo();
  }, [])

  useEffect(() => {
    const getProductsInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/mypage/productsinfo`);
        console.log(response.data);
        setProducts(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getProductsInfo();
  }, [])

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/mypage/reviews`);
        console.log(response.data);
        setReviews(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getReviews();
  }, [])

  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <h1 className="display-5 fw-bolder">마이페이지</h1>
          <p className="lead">여기에서 내 정보와 등록한 제품 및 리뷰를 확인할 수 있습니다.</p>
          <UserInfoCard
            userId={userId}
            username={username}
            email={email}
            phoneNumber={phoneNumber}
          />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bolder">내가 등록한 제품</h2>
            <button className="btn btn-outline-dark">
              <i className="bi-pencil-square me-1"></i> 제품 등록/수정/삭제
            </button>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
            <h2 className="fw-bolder">내가 작성한 리뷰</h2>
            <button className="btn btn-outline-secondary">
              <i className="bi-pencil-square me-1"></i> 리뷰 수정/삭제
            </button>
          </div>
          <ReviewList reviews={reviews} />
        </div>
      </section>
    </>
  );
};

export default MyPage;

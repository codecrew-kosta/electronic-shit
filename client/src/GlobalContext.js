/**
 * 2024.10.15_남윤호_전역 스테이트를 관리하는 곳임
 * useContext부분을 app.js에서 불러오지 않고 모듈화 시킴
 * 여기다 정의하고 필요한 컴포넌트에서 꺼내다 쓸수 있음
 * 꺼내다 쓰는거는 /products/ProductsDetail.js 참고하셈
 */

import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const GlobalContext = createContext();

// Provider 컴포넌트
export const GlobalProvider = ({ children }) => {
  // 상품 목록 스테이트
  const [productList, setProductList] = useState([]);

  // 리뷰 목록 스테이트
  const [reviewList, setReviewList] = useState([]);

  // 페이지네이션 페이지 스테이트 (10-16 한채경 추가)
  const [currentPage, setCurrentPage] = useState(1);

  // 로딩 스테이트 (10-16 한채경 추가)
  const [loading, setLoading] = useState(true);

  // 검색어 스테이트 (10-16 한채경 추가)
  const [searchTerm, setSearchTerm] = useState("");

  // 20241018_남윤호_이미지url 스테이트
  const [imgUrl, setImgUrl] = useState("");

  // 상품 객체 스테이트
  const [product, setProduct] = useState({
    productNo: "",
    category: "",
    name: "",
    brand: "",
    releasedDate: "",
    price: 0,
    photo: "",
    salesStatus: 0,
    stocks: 0,
    dateAdded: "",
    dateModified: "",
    userNo: 0,
    userId: "",
  });

  // 리뷰 객체 스테이트
  const [review, setReview] = useState({
    CommentNo: 0,
    rate: 0,
    commentText: "",
    dateAdded: "",
    dateModified: "",
    userNo: 0,
    userId: "",
    productId: 0,
  });


  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인 조영우 추가
  // const [isLoggedIn, setIsLoggedIn] = useState("false"); // 로그인 상태 확인 조영우 추가
  console.log(isLoggedIn, "전역");

  //바로 바로 반영되게
  useEffect(() => {
    console.log("로그인 상태 변경:", isLoggedIn);
  }, [isLoggedIn]);  // isLoggedIn이 변경될 때마다 이 부분이 실행됨


  const [username, setUsername] = useState(""); // 로그인된 사용자 이름을 저장하는 상태 조영우 추가

  return (
    <GlobalContext.Provider
      value={{
        productList,
        setProductList,
        reviewList,
        setReviewList,
        product,
        setProduct,
        review,
        setReview,
        isLoggedIn, setIsLoggedIn,
        username, setUsername,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        imgUrl, setImgUrl
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

/**
 * 2024.10.15_남윤호_전역 스테이트를 관리하는 곳임
 * useContext부분을 app.js에서 불러오지 않고 모듈화 시킴
 * 여기다 정의하고 필요한 컴포넌트에서 꺼내다 쓸수 있음
 * 꺼내다 쓰는거는 /products/ProductsDetail.js 참고하셈
 */

import axios from 'axios';
import React, { createContext, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

// Context 생성
export const GlobalContext = createContext();

// Provider 컴포넌트
export const GlobalProvider = ({ children }) => {

    // 상품 목록 스테이트
    const [productList, setProductList] = useState([]);

    // 리뷰 목록 스테이트
    const [reviewList, setReviewList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인
    const [username, setUsername] = useState("");// 로그인된 사용자 이름을 저장하는 상태
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
        userId: ""
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
        productId: 0
    });

    // 액세스 토큰 유효성 확인
    const checkAccessToken = async () => {
        try {
          // 서버에 액세스 토큰 검증 요청
          const response = await axios.get("http://localhost:3001/auth/validate-token", {
            withCredentials: true, // HTTP-Only 쿠키 포함
          });
  
          // 토큰이 유효한 경우, 서버에서 받은 사용자 이름을 상태로 설정
          setIsLoggedIn(true);
          setUsername(response.data.user.username); // 사용자 이름을 받아와서 상태로 저장
        } catch (error) {
          setIsLoggedIn(false); // 토큰이 유효하지 않으면 로그인 상태 
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // 리프레시 토큰이 없거나 만료된 경우 로그아웃 처리
            handleLogout();
          }
        }
      };
      const handleLogout = useLogout();

    //   const handleLogout = async () => {
    //     const navigate = useNavigate()
    //     try {
    //       await axios.post(
    //         'http://localhost:3001/auth/logout',
    //         {},
    //         { withCredentials: true } // 쿠키 포함
    //       );
    //       setIsLoggedIn(false); // 상태 초기화
    //     } catch (error) {
    //       console.error('Logout failed:', error);
    //     } finally {
    //       navigate('/'); // 메인 페이지로 리다이렉트
    //     }
    //   };
    
    // // 커스텀 훅을 통해 로그아웃 처리
    // const useLogout = () => {
    //     const navigate = useNavigate(); // useNavigate를 커스텀 훅에서 사용

    //     const handleLogout = async () => {
    //         try {
    //             await axios.post(
    //                 'http://localhost:3001/auth/logout',
    //                 {},
    //                 { withCredentials: true }
    //             );
    //             setIsLoggedIn(false);
    //             setUsername('');
    //             navigate('/'); // 메인 페이지로 이동
    //         } catch (error) {
    //             console.error('Logout failed:', error);
    //         }
    //     };

    //     return handleLogout;
    // };

    // const handleLogout = useLogout(); // 로그아웃 함수를 가져옴

    return (
        <GlobalContext.Provider value={{
            productList, setProductList,
            reviewList, setReviewList,
            product, setProduct,
            review, setReview,
            isLoggedIn, setIsLoggedIn,
            username, setUsername,
            checkAccessToken, handleLogout,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// 커스텀 훅: 로그아웃 기능을 수행
export const useLogout = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { setIsLoggedIn, setUsername } = useContext(GlobalContext);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUsername('');
            navigate('/'); // 메인 페이지로 리다이렉트
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return handleLogout;
};
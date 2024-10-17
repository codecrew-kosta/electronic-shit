/**
 * <Warning>
 *
 * 모두의 합의가 있기 전까지 이 문서는 아무도 건드리지 말 것.
 *
 * 2024.10.15_남윤호
 * useContext 전역스테이트 쓸꺼임, 막을수 없으셈
 *  */

// App.js
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/home/Header";
import Products from "./components/home/Products";
import ProductDetail from "./components/products/ProductDetail";
import RelatedProducts from "./components/products/RelatedProducts";
import Login from "./components/login/Login";
import { GlobalContext, GlobalProvider } from "./GlobalContext"; //전역 스테이트 관리
// import './App.css';
import CategoryProducts from "./components/home/CategoryProducts"; // 10-16 한채경 추가
import ProductsCRUD from "./components/products/ProductsCRUD";

function App() {
  const { checkAccessToken, isLoggedIn } = useContext(GlobalContext); // useContext 사용
  useEffect(() => {
    checkAccessToken(); // 컴포넌트 마운트 시 토큰 검사
  }, [checkAccessToken]);

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Products />
              </>
            }
          />
          <Route
            path="/products/:no"
            element={
              <>
                <ProductDetail />
                <RelatedProducts />
              </>
            }
          />
          {/* 2024.10.16_남윤호_상품관리 CRUD */}
          <Route
            path="/productsCRUD"
            element={
              <>
                <ProductsCRUD />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          {/* 카테고리 추가 10-16 한채경 */}
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

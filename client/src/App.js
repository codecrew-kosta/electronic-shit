/**
 * <Warning>
 * 
 * 모두의 합의가 있기 전까지 이 문서는 아무도 건드리지 말 것.
 * 
 * 2024.10.15_남윤호
 * useContext 전역스테이트 쓸꺼임, 막을수 없으셈
 *  */

// App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/home/Header';
import Products from './components/home/Products';
import ProductDetail from './components/products/ProductDetail';
import RelatedProducts from './components/products/RelatedProducts';
import Login from './components/login/Login';
import { GlobalProvider } from './GlobalContext'; //전역 스테이트 관리
// import './App.css';

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<>
            <Header />
            <Products />
          </>} />
          <Route path='/products/:no' element={<>
            <ProductDetail />
            <RelatedProducts />
          </>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;


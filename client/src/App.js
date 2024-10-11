/**
 * <Warning>
 * 
 * 모두의 합의가 있기 전까지 이 문서는 아무도 건드리지 말 것.
 * 
 *  */

// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/home/Header';
import Products from './components/home/Products';
import ProductDetail from './components/products/ProductDetail';
import RelatedProducts from './components/products/RelatedProducts';
import Login from './components/login/Login';
import './App.css';

function App() {
  return (<>
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
  </>);
}

export default App;


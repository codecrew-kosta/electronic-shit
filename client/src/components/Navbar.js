import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 서버로 요청을 보내기 위한 axios 사용
import { GlobalContext } from '../GlobalContext';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  const { username, setUsername } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("user")) {
          setIsLoggedIn(true);
          setUsername(localStorage.getItem("user").username); // 사용자 이름을 받아와서 상태로 저장
        } else {
          const response = await axios.get(`http://localhost:3001/logout`);
          setIsLoggedIn(false); // 상태 초기화
          navigate('/'); // 메인 페이지로 리다이렉트
          console.log(response.data);
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    const response = await axios.get(`http://localhost:3001/logout`);
    setIsLoggedIn(false); // 상태 초기화
    localStorage.removeItem('user');
    navigate('/'); // 메인 페이지로 리다이렉트
    console.log(response.data);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="/">
          Start Bootstrap
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Shop
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/category/전체">
                    All Products
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Popular Items
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/category/스마트폰">
                    Smartphones
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/태블릿">
                    Tablets
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/스마트워치">
                    Smartwatches
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/노트북">
                    Laptops
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/헤드폰">
                    Headphones
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/블루투스 스피커">
                    Bluetooth Speakers
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/전자책 리더기">
                    E-Readers
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/디지털 카메라">
                    Digital Cameras
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/게임 노트북">
                    Gaming Laptops
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/category/게임 콘솔">
                    Game Consoles
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-dark" type="submit">
              <i className="bi-cart-fill me-1"></i>Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
            </button>
          </form>
          &nbsp;
          {isLoggedIn ? (
            <>
              <span className="navbar-text">
                환영합니다, {username} 님!
              </span>
              &nbsp;
              <button
                className="btn btn-outline-dark"
              >
                마이페이지
              </button>
              &nbsp;
              <button
                className="btn btn-outline-dark"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/login")}
            >
              Sign In / Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

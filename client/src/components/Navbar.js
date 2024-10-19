import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios"; // 서버로 요청을 보내기 위한 axios 사용
import { GlobalContext } from "../GlobalContext";
import SearchForm from "./SearchForm";

function Navbar() {
  const { setCurrentPage } = useContext(GlobalContext); // 상태 초기화 함수와 페이지네이션 스테이트 가져오기

  // 페이지 이동 시 페이지네이션 초기화 함수
  const handleNavLinkClick = (path) => {
    setCurrentPage(1);
  };

  // const [csrfToken, setCsrfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인
  const [username, setUsername] = useState(""); // 로그인된 사용자 이름을 저장하는 상태
  const navigate = useNavigate();

  // // 서버에서 CSRF 토큰을 가져옴
  // axios.get('http://localhost:3001/auth/csrf-token', { withCredentials: true })
  //   .then((response) => setCsrfToken(response.data.csrfToken))
  //   .catch((error) => console.error('Failed to fetch CSRF token:', error));

  useEffect(() => {
    // 액세스 토큰 유효성 확인
    const checkAccessToken = async () => {
      try {
        // 서버에 액세스 토큰 검증 요청
        const response = await axios.get(
          "http://localhost:3001/auth/validate-token",
          {
            withCredentials: true, // HTTP-Only 쿠키 포함
          }
        );

        // 토큰이 유효한 경우, 서버에서 받은 사용자 이름을 상태로 설정
        setIsLoggedIn(true);
        setUsername(response.data.user.username); // 사용자 이름을 받아와서 상태로 저장
      } catch (error) {
        setIsLoggedIn(false); // 토큰이 유효하지 않으면 로그인 상태 해제
      }
    };

    checkAccessToken(); // 컴포넌트 마운트 시 토큰 검사
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/auth/logout",
        {},
        { withCredentials: true } // 쿠키 포함
      );
      setIsLoggedIn(false); // 상태 초기화
      navigate("/"); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <NavLink
          className="navbar-brand"
          to="/"
          onClick={() => handleNavLinkClick("/")}
        >
          Start Bootstrap
        </NavLink>
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
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/"
                onClick={() => handleNavLinkClick("/")}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/about"
                onClick={() => handleNavLinkClick("/about")}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Shop
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/전체"
                    onClick={() => handleNavLinkClick("/category/전체")}
                  >
                    All Products
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/popular"
                    onClick={() => handleNavLinkClick("/popular")}
                  >
                    Popular Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/new"
                    onClick={() => handleNavLinkClick("/new")}
                  >
                    New Arrivals
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/스마트폰"
                    onClick={() => handleNavLinkClick("/category/스마트폰")}
                  >
                    Smartphones
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/태블릿"
                    onClick={() => handleNavLinkClick("/category/태블릿")}
                  >
                    Tablets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/스마트워치"
                    onClick={() => handleNavLinkClick("/category/스마트워치")}
                  >
                    Smartwatches
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/노트북"
                    onClick={() => handleNavLinkClick("/category/노트북")}
                  >
                    Laptops
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/헤드폰"
                    onClick={() => handleNavLinkClick("/category/헤드폰")}
                  >
                    Headphones
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/블루투스 스피커"
                    onClick={() =>
                      handleNavLinkClick("/category/블루투스 스피커")
                    }
                  >
                    Bluetooth Speakers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/전자책 리더기"
                    onClick={() =>
                      handleNavLinkClick("/category/전자책 리더기")
                    }
                  >
                    E-Readers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/디지털 카메라"
                    onClick={() =>
                      handleNavLinkClick("/category/디지털 카메라")
                    }
                  >
                    Digital Cameras
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/게임 노트북"
                    onClick={() => handleNavLinkClick("/category/게임 노트북")}
                  >
                    Gaming Laptops
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={
                      ({ isActive }) =>
                        `dropdown-item ${isActive ? "active" : ""}` // 중복 방지
                    }
                    to="/category/게임 콘솔"
                    onClick={() => handleNavLinkClick("/category/게임 콘솔")}
                  >
                    Game Consoles
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <SearchForm />
          <form className="d-flex">
            <button className="btn btn-outline-dark me-2" type="submit">
              <i className="bi-cart-fill me-1"></i>Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                0
              </span>
            </button>
          </form>
          {isLoggedIn ? (
            <>
              <span className="navbar-text">환영합니다, {username} 님!</span>
              &nbsp;
              <button className="btn btn-outline-dark">마이페이지</button>
              &nbsp;
              <button className="btn btn-outline-dark" onClick={handleLogout}>
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

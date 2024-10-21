import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios"; // 서버로 요청을 보내기 위한 axios 사용
import { GlobalContext } from "../GlobalContext";
import { useLocation } from 'react-router-dom';
function Navbar() {

  //세션스토리지에서 값꺼내기 
  const sessionUser = sessionStorage.getItem('user');
  console.log(sessionUser);
  let location = useLocation();
  const [isLogin, setIsLogin] = useState(false)
  const { setCurrentPage, setIsLoggedIn, username, setUsername } = useContext(GlobalContext); // 상태 초기화 함수와 페이지네이션 스테이트 가져오기
  const [navbarSearchTerm, setNavbarSearchTerm] = useState(""); // Navbar 내에서만 사용할 검색어 상태

  const [navname, setnavname] = useState("");

  useEffect(() => {
    // username이 변경될 때마다 setNavName 호출
    setnavname(username);
  }, [username, setnavname]);

  //태현님이
  useEffect(() => {
    if (sessionUser) {
      setIsLogin(true)

    } else {
      setIsLogin(false);

    }
  }, [location, sessionUser]);

  console.log(location.pathname, "네브바",);

  console.log("username", username);


  // 검색어 입력 핸들러
  const handleNavbarSearchChange = (event) => {
    setNavbarSearchTerm(event.target.value);
  };

  const handleNavbarSearchSubmit = (event) => {
    event.preventDefault();

    // 검색어가 없거나 공백일 경우 검색을 하지 않음
    if (!navbarSearchTerm.trim()) {
      console.log("검색어가 입력되지 않았습니다.");
      return; // 공백 또는 빈 문자열일 경우 검색 방지
    }

    const url = `http://localhost:3000/search?query=${encodeURIComponent(
      navbarSearchTerm.trim() // 공백을 제거한 후 검색어로 사용
    )}`;
    window.location.href = url; // 페이지 이동
  };

  // 페이지 이동 시 페이지네이션 초기화 함수
  const handleNavLinkClick = (path) => {
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = JSON.parse(localStorage.getItem("user")); // JSON 파싱
  //       if (user) {
  //         setIsLoggedIn(true);
  //         setUsername(user.name); // 사용자 이름을 받아와서 상태로 저장
  //       } else {
  //         // await handleLogout();
  //         // setIsLoggedIn(false); // 상태 초기화
  //         // // navigate('/'); // 메인 페이지로 리다이렉트ㄴ
  //         // console.log(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Logout failed:", error);
  //     }
  //   };

  //   fetchData();
  // }, [navigate, setUsername, setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      // const sessionId = localStorage.getItem('sessionId'); // 세션 ID 가져오기

      // if (!sessionId) {
      //   console.warn('세션 ID가 존재하지 않습니다.');
      //   return;
      // }

      // // 로그아웃 요청
      // const response = await axios.post(
      //   'http://localhost:3001/logout',
      //   {},
      //   {
      //     headers: {
      //       Authorization: sessionId, // 세션 ID를 헤더에 포함
      //     },
      //     withCredentials: true, // CORS 문제 해결을 위한 설정 (필요 시)
      //   }
      // );

      // console.log(response.data.message); // 로그아웃 성공 메시지 출력

      // 상태 초기화 및 로컬 스토리지 정리
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      setnavname("");
      // localStorage.removeItem('sessionId');
      navigate('/'); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error('Logout failed:', error);
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
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/태블릿"
                    onClick={() => handleNavLinkClick("/category/태블릿")}
                  >
                    Tablets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/스마트워치"
                    onClick={() => handleNavLinkClick("/category/스마트워치")}
                  >
                    Smartwatches
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/노트북"
                    onClick={() => handleNavLinkClick("/category/노트북")}
                  >
                    Laptops
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/헤드폰"
                    onClick={() => handleNavLinkClick("/category/헤드폰")}
                  >
                    Headphones
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
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
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
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
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
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
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
                    }
                    to="/category/게임 노트북"
                    onClick={() => handleNavLinkClick("/category/게임 노트북")}
                  >
                    Gaming Laptops
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active" : ""}`
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
          <form className="d-flex" onSubmit={handleNavbarSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={navbarSearchTerm}
              onChange={handleNavbarSearchChange} // 별도의 상태로 관리
            />
            <button className="btn btn-outline-dark me-2" type="submit">
              <i className="bi-search"></i>
            </button>
          </form>
          <form className="d-flex">
            <button className="btn btn-outline-dark me-2" type="submit">
              <i className="bi-cart-fill me-1"></i>Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                0
              </span>
            </button>
          </form>
          {isLogin ? (
            <>
              <span className="navbar-text">환영합니다, {navname} 님!</span>
              &nbsp;
              <button className="btn btn-outline-dark" onClick={() => navigate("/mypage")}>마이페이지</button>
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

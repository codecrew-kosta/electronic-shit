import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
function Navbar() {
  //세션스토리지에서 값꺼내기
  const sessionUser = sessionStorage.getItem("user");
  // console.log(sessionUser);
  const userName = sessionUser ? JSON.parse(sessionUser).username : "Unknown";
  const { setCurrentPage, setIsLoggedIn, cartItemCount, fetchItems } =
    useContext(GlobalContext); // 상태 초기화 함수와 페이지네이션 스테이트 가져오기
  const [isLogin, setIsLogin] = useState(false);
  const [navbarSearchTerm, setNavbarSearchTerm] = useState(""); // Navbar 내에서만 사용할 검색어 상태
  const navigate = useNavigate();

  //태현님이
  useEffect(() => {
    if (sessionUser) {
      setIsLogin(true);
      console.log("로그인: ", userName);
    } else {
      setIsLogin(false);
      console.log("로그아웃 상태");
    }
  }, [sessionUser]);

  // 검색어 입력 핸들러
  const handleNavbarSearchChange = (event) => {
    setNavbarSearchTerm(event.target.value);
  };

  const handleNavbarSearchSubmit = (event) => {
    event.preventDefault();
    if (!navbarSearchTerm.trim()) {
      console.log("검색어가 입력되지 않았습니다.");
      return;
    }
    navigate(`/search?query=${encodeURIComponent(navbarSearchTerm.trim())}`);
  };

  const handleNavLinkClick = (path) => {
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchItems(); // 컴포넌트가 마운트될 때 아이템 가져오기
  }, []);

  const handleLogout = async () => {
    try {
      // 상태 초기화 및 로컬 스토리지 정리
      setIsLoggedIn(false);
      sessionStorage.removeItem("user");
      navigate("/"); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCartClick = () => {
    navigate("/myshopping");
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
              onChange={handleNavbarSearchChange}
            />
            <button className="btn btn-outline-dark me-2" type="submit">
              <i className="bi-search"></i>
            </button>
          </form>
          <button
            className="btn btn-outline-dark me-2"
            onClick={handleCartClick}
          >
            <i className="bi-cart-fill me-1"></i>Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">
              {cartItemCount} {/* 상태로 관리하는 카트 아이템 수 */}
            </span>
          </button>
          {isLogin ? (
            <>
              <span className="navbar-text">환영합니다, {userName} 님!</span>
              &nbsp;
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate("/mypage")}
              >
                마이페이지
              </button>
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

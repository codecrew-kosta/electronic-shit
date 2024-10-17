import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import SearchForm from "./SearchForm";

function Navbar() {
  const { setCurrentPage } = useContext(GlobalContext); // 상태 초기화 함수와 페이지네이션 스테이트 가져오기

  // 페이지 이동 시 페이지네이션 초기화 함수
  const handleNavLinkClick = (path) => {
    setCurrentPage(1);
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
          <button className="btn btn-outline-dark" type="submit">
            <i className="bi-person-fill me-1"></i>Sign In / Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

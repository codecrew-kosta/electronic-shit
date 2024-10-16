// components/Navbar.js
import React from "react";

function Navbar() {
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
              <a className="nav-link active" href="#!">
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
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                0
              </span>
            </button>
          </form>
          &nbsp;
          <button className=" btn btn-outline-dark" type="submit">
            <i className="bi-cart-fill"></i>Sign In / Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

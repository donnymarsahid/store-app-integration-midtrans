import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import logoWaysBucks from '../../assets/img/logo-waysbucks.svg';

const Navbar = () => {
  return (
    <>
      <nav className="fixed-top shadow-sm d-flex align-items-center">
        <div className="container-navbar d-flex justify-content-between align-items-center">
          <div className="logo-brand">
            <Link to="/">
              <img src={logoWaysBucks} alt="logo-waysbucks" />
            </Link>
          </div>
          <div className="navbar-link">
            <ul className="d-flex m-0 p-0 ps-3 justify-content-lg-around">
              <Link to="/best-seller" className="text-decoration-none ">
                <li className="fw-bolder">Best Seller</li>
              </Link>
              <div className="link-router text-decoration-none">
                <Link to="/all-menu" className="link-router text-decoration-none">
                  <li className="menu">
                    <p className="text-uppercase m-0 fw-bolder">All Menu</p>
                  </li>
                </Link>
              </div>
              <Link to="/store" className="link-router text-decoration-none">
                <li className="store">
                  <p className="text-uppercase m-0 fw-bolder">Store</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="access">
            <button className="btn-login me-3" data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
              Login
            </button>
            <button className="btn-register" data-bs-toggle="modal" data-bs-target="#exampleModalRegister">
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

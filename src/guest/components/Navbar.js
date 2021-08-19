import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import logoWaysBucks from '../../assets/img/logo-waysbucks.svg';

const Navbar = () => {
  return (
    <>
      <nav class="fixed-top shadow-sm d-flex align-items-center">
        <div class="container-navbar d-flex justify-content-between align-items-center">
          <div class="logo-brand">
            <Link to="/">
              <img src={logoWaysBucks} alt="logo-waysbucks" />
            </Link>
          </div>
          <div class="navbar-link">
            <ul class="d-flex m-0 p-0 ps-3 justify-content-lg-around">
              <Link to="/" class="text-decoration-none">
                <li>Homepage</li>
              </Link>
              <Link to="/" class="text-decoration-none">
                <li>Coffe</li>
              </Link>
              <Link to="/" className="link-router text-decoration-none">
                <li class="menu">
                  <p className="text-uppercase m-0">Menu</p>
                  <div class="box">
                    <p class="pb-3 m-0">All Menu</p>
                  </div>
                </li>
              </Link>
              <Link to="/" className="link-router text-decoration-none">
                <li class="store">
                  <p className="text-uppercase m-0">Store</p>
                  <div class="box">
                    <p class="pb-3 m-0">Location</p>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div class="access">
            <Link to="/login">
              <button class="btn-login me-3">Login</button>
            </Link>
            <Link to="/register">
              <button class="btn-register">Register</button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

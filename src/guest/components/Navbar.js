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

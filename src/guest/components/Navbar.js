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
              <Link to="/" className="text-decoration-none">
                <li>Homepage</li>
              </Link>
              <Link to="/coffee" className="text-decoration-none">
                <li>Coffee</li>
              </Link>
              <div className="link-router text-decoration-none">
                <li className="menu">
                  <p className="text-uppercase m-0">Menu</p>
                  <div className="box">
                    <Link to="/all-menu" className="text-decoration-none">
                      <p className="pb-3 m-0">All Menu</p>
                    </Link>
                  </div>
                </li>
              </div>
              <Link to="/" className="link-router text-decoration-none">
                <li className="store">
                  <p className="text-uppercase m-0">Store</p>
                  <div className="box">
                    <p className="pb-3 m-0">Location</p>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div className="access">
            <Link to="/login">
              <button className="btn-login me-3">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn-register">Register</button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

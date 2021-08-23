import React, { useEffect } from 'react';
import '../css/style.css';
import { Link, useHistory } from 'react-router-dom';
import logoWaysBucks from '../../assets/img/logo-waysbucks.svg';
import cartIcon from '../../assets/img/cart.svg';
import swal from 'sweetalert';
import { useState } from 'react/cjs/react.development';

const NavbarAdmin = () => {
  const history = useHistory();

  const handlerLogout = () => {
    swal({
      title: 'Are you sure logout?',
      text: 'You will be logged out of the user page',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        localStorage.setItem('login_auth', false);
        localStorage.clear('coffee_variant');
        localStorage.clear('coffee_all');
        localStorage.clear('user_transaction');
        history.push('/');
        window.location.reload();
      }
    });
  };
  return (
    <>
      <nav className="fixed-top shadow-sm d-flex align-items-center">
        <div className="container-navbar d-flex justify-content-between align-items-center">
          <div className="logo-brand">
            <Link to="/admin">
              <img src={logoWaysBucks} alt="logo-waysbucks" />
            </Link>
          </div>
          <div className="navbar-link">
            <ul className="d-flex m-0 me-4 p-0 justify-content-lg-around">
              <Link to="/admin/income-transaction" className="text-decoration-none ">
                <li className="fw-bolder">IncomeTransaction</li>
              </Link>
              <Link to="/admin/add-product" className="link-router text-decoration-none ms-5 me-5">
                <li className="menu">
                  <p className="text-uppercase m-0 fw-bolder">AddProduct</p>
                </li>
              </Link>
              <Link to="/admin/add-topping" className="link-router text-decoration-none">
                <li className="store">
                  <p className="text-uppercase m-0 fw-bolder">AddTopping</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="access d-flex">
            <div className="profile">
              <i className="fas fa-user-circle avatar"></i>
              <div className="dropdown">
                <Link to="/" className="text-decoration-none">
                  Profile
                </Link>
                <hr />
                <button onClick={handlerLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;

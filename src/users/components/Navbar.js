import React, { useEffect } from 'react';
import '../css/style.css';
import { Link, useHistory } from 'react-router-dom';
import logoWaysBucks from '../../assets/img/logo-waysbucks.svg';
import cartIcon from '../../assets/img/cart.svg';
import swal from 'sweetalert';
import { useState } from 'react/cjs/react.development';

const Navbar = () => {
  const history = useHistory();
  const [totalCart, setTotalCart] = useState(0);

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
  const cart = JSON.parse(localStorage.getItem('user_transaction'));
  useEffect(() => {
    setTotalCart(cart.order.length);
  }, [cart]);
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
              <Link to="/coffee" className="text-decoration-none ">
                <li className="fw-bolder">Coffee</li>
              </Link>
              <div className="link-router text-decoration-none">
                <li className="menu">
                  <p className="text-uppercase m-0 fw-bolder">Menu</p>
                  <div className="box">
                    <Link to="/all-menu" className="text-decoration-none">
                      <p className="pb-3 m-0">All Menu</p>
                    </Link>
                  </div>
                </li>
              </div>
              <Link to="/" className="link-router text-decoration-none">
                <li className="store">
                  <p className="text-uppercase m-0 fw-bolder">Store</p>
                  <div className="box">
                    <p className="pb-3 m-0">Location</p>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div className="access d-flex">
            <div className="shop d-flex align-items-center">
              <Link to="/cart-page">
                <img src={cartIcon} alt="cart" className="me-5" width="30px" />
                <span className="d-flex justify-content-center align-items-center">{totalCart}</span>
              </Link>
            </div>
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

export default Navbar;

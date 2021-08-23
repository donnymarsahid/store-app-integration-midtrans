import React, { useEffect } from 'react';
import '../css/style.css';
import { Link, useHistory } from 'react-router-dom';
import logoWaysBucks from '../../assets/img/logo-waysbucks.svg';
import logout from '../../assets/img/logout.svg';
import cartIcon from '../../assets/img/cart.svg';
import swal from 'sweetalert';
import { useState } from 'react/cjs/react.development';

const Navbar = () => {
  const history = useHistory();
  const [totalCart, setTotalCart] = useState(0);
  const dataUser = JSON.parse(localStorage.getItem('user_order'));
  const IMG_URL_PROFILE = '/images/';

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
        history.push('/');
        window.location.reload();
      }
    });
  };
  const cart = JSON.parse(localStorage.getItem('user_order'));
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
              <Link to="/store" className="link-router text-decoration-none">
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
              <div className="btn-group dropstart">
                <img src={`${IMG_URL_PROFILE}${dataUser.image}`} alt="profile" width="30px" className="img-profile" data-bs-toggle="dropdown" />
                <ul className="dropdown-menu">
                  <Link to="/profile" className="text-decoration-none">
                    <li className="li-profile">
                      <p className="ps-3 pt-2">
                        <i class="far fa-user pe-2"></i> Profile
                      </p>
                    </li>
                  </Link>
                  <li className="logout" onClick={handlerLogout}>
                    <p className="ps-3 pt-3">
                      <img src={logout} alt="logout" width="25px" /> Logout
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

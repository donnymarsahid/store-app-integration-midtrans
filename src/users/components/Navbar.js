import React from 'react';
import '../css/style.css';
import { Link, useHistory } from 'react-router-dom';
import logoWaysBucks from '../../assets/img/logo-waysbucks.svg';
import swal from 'sweetalert';

const Navbar = () => {
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
        history.push('/');
        window.location.reload();
      }
    });
  };
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
            <ul class="d-flex m-0 p-0 ps-4 justify-content-lg-around">
              <Link to="/" class="text-decoration-none">
                <li>Homepage</li>
              </Link>
              <Link to="/coffee" class="text-decoration-none">
                <li>Coffee</li>
              </Link>
              <Link to="/all-menu" className="link-router text-decoration-none">
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
          <div class="access d-flex">
            <div class="shop d-flex align-items-center">
              <p class="fw-bold m-0">(0)</p>
              <i class="fas fa-shopping-basket ms-1 me-4"></i>
            </div>
            <div class="profile">
              <i class="fas fa-user-circle avatar"></i>
              <div class="dropdown">
                <Link to="/" class="text-decoration-none">
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

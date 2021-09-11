import React, { useContext } from 'react';
import '../css/style.css';
import { Link, useHistory } from 'react-router-dom';
import logoWaysBucks from '../../../assets/img/logo-waysbucks.svg';
import logout from '../../../assets/img/logout.svg';
import user from '../../../assets/img/user.svg';
import cartIcon from '../../../assets/img/cart.svg';
import swal from 'sweetalert';
import { UserContext } from '../../../context/userContext';
import { useQuery } from 'react-query';
import { getCarts, getUser } from '../../../config/api';

const Navbar = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const { data: carts } = useQuery('getCartsCache', getCarts);
  const { data: userId } = useQuery('getUserIdCache', getUser);

  const handlerLogout = () => {
    swal({
      title: 'Are you sure logout?',
      text: 'You will be logged out of the user page',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        dispatch({
          type: 'LOGOUT',
        });
        localStorage.removeItem('token');
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
            <Link to="/">
              <img src={logoWaysBucks} alt="logo-waysbucks" />
            </Link>
          </div>
          <div className="navbar-link pe-2">
            <ul className="d-flex m-0 p-0 ps-3 justify-content-lg-around">
              <Link to="/contact" className="text-decoration-none ">
                <li className="fw-bolder">Contact</li>
              </Link>
              <div className="link-router text-decoration-none">
                <Link to="/all-menu" className="link-router text-decoration-none">
                  <li className="menu">
                    <p className="text-uppercase m-0 fw-bolder">All Menu</p>
                  </li>
                </Link>
              </div>
              <Link to="/about" className="link-router text-decoration-none">
                <li className="store">
                  <p className="text-uppercase m-0 fw-bolder">About</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="access d-flex">
            <div className="shop d-flex align-items-center">
              <Link to="/cart-page">
                <img src={cartIcon} alt="cart" className="me-4 image-cart" width="30px" />
                <span className="d-flex justify-content-center align-items-center">{carts?.length}</span>
              </Link>
            </div>
            <div className="profile">
              <div class="dropdown">
                <img src={userId?.image} alt="profile" width="30px" className="img-profile" data-bs-toggle="dropdown" />
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link to="/profile" className="text-decoration-none">
                    <li className="dropdown-profile d-flex">
                      <img src={user} alt="profile" />
                      <p className="m-0">Profile</p>
                    </li>
                  </Link>
                  <li className="dropdown-logout d-flex" onClick={handlerLogout}>
                    <img src={logout} alt="profile" />
                    <p className="m-0">Logout</p>
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

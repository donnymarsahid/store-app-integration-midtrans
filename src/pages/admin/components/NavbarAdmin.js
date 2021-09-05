import React, { useContext } from 'react';
import '../css/style.css';
import { Link, useHistory } from 'react-router-dom';
import logoWaysBucks from '../../../assets/img/logo-waysbucks.svg';
import swal from 'sweetalert';
import logout from '../../../assets/img/logout.svg';
import { UserContext } from '../../../context/userContext';

const NavbarAdmin = () => {
  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();
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
            <Link to="/admin">
              <img src={logoWaysBucks} alt="logo-waysbucks" />
            </Link>
          </div>
          <div className="access d-flex">
            <div className="profile">
              <div className="btn-group dropstart">
                <img src={`${IMG_URL_PROFILE}profile.png`} alt="profile" width="30px" className="img-profile" data-bs-toggle="dropdown" />
                <ul className="dropdown-menu">
                  <Link className="text-decoration-none">
                    <li className="li-profile">
                      <p className="ps-3 pt-2">
                        <i class="far fa-user pe-2"></i> Admin
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

export default NavbarAdmin;

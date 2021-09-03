import React, { useContext } from 'react';
import './css/style.css';
import imgHeader from '../../assets/img/img-header.png';
import { context } from '../../App';
import CardCoffe from './cardsProducts/CardCoffe';
import { Link } from 'react-router-dom';
import Login from '../access/Login';
import Register from '../access/Register';
import store from '../../assets/img/merchant-waysbucks.png';

const Guest = () => {
  const { coffeeVariant } = useContext(context);
  const cardCoffee = coffeeVariant.map((coffee) => {
    return <CardCoffe coffee={coffee} key={coffee.id} />;
  });

  return (
    <>
      <title>WaysBucks</title>
      <header>
        <div className="container d-flex align-items-center">
          <div className="jumbotron">
            <h1 className="mb-3">WAYSBUCKS</h1>
            <p>Things are changing, but we’re still here for you</p>
            <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
            <Link to="/all-menu">
              <button className="btn-order">LETS ORDER</button>
            </Link>
          </div>
          <div className="img-header">
            <img src={imgHeader} alt="header-waysbucks" />
          </div>
        </div>
      </header>
      <section className="varian">
        <div className="container">
          <h3>Best Seller</h3>
          <div className="row">{cardCoffee}</div>
        </div>
      </section>
      <div className="button-read-more d-flex justify-content-center">
        <Link to="/best-seller">
          <button className="btn-best-seller me-5 text-uppercase">see best seller</button>
        </Link>
        <Link to="/all-menu">
          <button className="btn-all-menu text-uppercase">see all menu</button>
        </Link>
      </div>
      <div class="carousel">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/images/carousel/jb-waysbucks-1.png" class="d-block w-100" alt="slide-1" />
            </div>
            <div class="carousel-item">
              <img src="/images/carousel/jb-waysbucks-2.png" class="d-block w-100" alt="slide-2" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="location">
        <div class="container">
          <div class="row">
            <h3>Location</h3>
            <div class="col-md-6">
              <img src={store} alt="merchant-waysbucks" />
            </div>
            <div class="col-md-6 d-flex">
              <div class="icon me-2">
                <h3>
                  <i class="fas fa-map-marker-alt"></i>
                </h3>
              </div>
              <div class="detail">
                <h3>WaysBucks Coffee, Jakarta City</h3>
                <p>WaysBucks Coffee, in Road tomang number 23, RT.03/RW.07, west jakarta city, districts palmerah, ward Jatipulo, Post Code 11430</p>
                <p>Open every day</p>
                <p>
                  <i class="fas fa-clock"></i> 08:00AM - 21:00PM
                </p>
                <p>
                  <a href="/store" className="text-decoration-none">
                    <i class="fas fa-envelope"></i> waysbuckscoffee@gmail.com
                  </a>
                </p>
                <p>
                  <a href="/store" className="text-decoration-none">
                    <i class="fas fa-phone"></i> 0838-7223-9021
                  </a>
                </p>
                <div class="google-maps">
                  <iframe
                    title="location waysbucks"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.743262628099!2d106.78790077041022!3d-6.172803545112276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f660d0866193%3A0x9f26e23cd7e3c120!2sTomang%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1630503627792!5m2!1sid!2sid"
                    width="400"
                    height="350"
                    style={{ border: '0' }}
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="register-now text-center">
        <p className="text-uppercase">register now</p>
        <p>Register an account so you can order coffee</p>
        <button className="btn-register" data-bs-toggle="modal" data-bs-target="#exampleModalRegister">
          Register
        </button>
        <p className="mt-2 mb-2">OR</p>
        <button className="btn-login" data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
          Login
        </button>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default Guest;

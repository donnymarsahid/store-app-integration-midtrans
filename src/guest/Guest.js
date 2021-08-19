import React from 'react';
import './css/style.css';
import imgHeader from '../assets/img/img-header.png';

const Guest = () => {
  return (
    <>
      <header>
        <div class="container d-flex align-items-center">
          <div class="jumbotron">
            <h1 class="mb-3">WAYSBUCKS</h1>
            <p>Things are changing, but we’re still here for you</p>
            <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
            <button class="btn-order">LETS ORDER</button>
          </div>
          <div class="img-header">
            <img src={imgHeader} alt="header-waysbucks" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Guest;

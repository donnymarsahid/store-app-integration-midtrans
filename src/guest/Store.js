import React from 'react';
import merchant from '../assets/img/merchant-waysbucks.png';

const Store = () => {
  return (
    <>
      <title>WaysBucks | Store</title>
      <section class="store">
        <div class="container">
          <h1>Location</h1>
          <div class="row">
            <div class="col-md-6">
              <img src={merchant} alt="merchant" className="img-fluid" />
            </div>
            <div class="col-md-6">
              <h3>
                <i class="fas fa-map-marker-alt"></i> WaysBucks Coffee, Jakarta City
              </h3>
              <p>WaysBucks Coffee, in Road tomang number 23, RT.03/RW.07, west jakarta city, districts palmerah, ward Jatipulo, Post Code 11430</p>
              <p>Open monday to sunday</p>
              <p>at : 08:00AM - 21:00PM</p>
              <p>Contact WaysBucks : 0838-7223-9021</p>
              <p>Email WaysBucks : waysbuckus.coffee@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Store;

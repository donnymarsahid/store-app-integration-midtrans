import React from 'react';
import merchant from '../assets/img/merchant-waysbucks.png';

const Store = () => {
  return (
    <>
      <section class="store">
        <div class="container">
          <h1>Location</h1>
          <div class="row">
            <div class="col-md-6">
              <img src={merchant} alt="merchant" className="img-fluid" />
            </div>
            <div class="col-md-6">
              <h3>
                <i class="fas fa-map-marker-alt"></i> Jalanin aja dulu No.899
              </h3>
              <p>Jalanin Aja Dulu, RT.03/RW.07, Kp. Parung Jambu, Tanah Baru, Kota Bogor, Jawa Barat</p>
              <p>Jl. Kol. Ahmad Syam No.899, RT.03/RW.07, RT.03/RW.07, Kp. Parung Jambu, Tanah Baru, North Bogor, Bogor City, West Java 16143</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Store;

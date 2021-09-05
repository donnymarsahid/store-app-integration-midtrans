import React from 'react';
import logo from '../../assets/img/logo-waysbucks.svg';
import barcode from '../../assets/img/barcode.svg';

const Profile = () => {
  return (
    <>
      <title>WaysBucks | Profile</title>
      <section className="profile">
        <div class="container">
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="title-image">
                <h3 className="mb-3">My Profile</h3>
                <div class="detail d-flex ">
                  <input type="file" name="upload" id="upload" className="d-none" />
                  <label for="upload">
                    <img src="" alt="profile" className="profile" />
                  </label>
                  <div class="text ps-4">
                    <p>Full Name : </p>
                    <p>Email : </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 transaction">
              <h3>My Transaction</h3>
              <div class="box-transaction">
                <div class="row">
                  <div class="col-md-8"></div>
                  <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} alt="logo" className="logo" />
                    <img src={barcode} alt="barcode" className="barcode mt-3 mb-3" />
                    <p>Sub Total : </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

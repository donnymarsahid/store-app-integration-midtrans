import React from 'react';
import profile from '../assets/img/profile.png';
import logo from '../assets/img/logo-waysbucks.svg';
import barcode from '../assets/img/barcode.svg';

const Profile = () => {
  return (
    <>
      <section className="profile">
        <div class="container">
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="title-image">
                <h3 className="mb-3">My Profile</h3>
                <div class="detail d-flex ">
                  <img src={profile} alt="profile" className="profile" />
                  <div class="text ps-4">
                    <p>Full Name : Donny</p>
                    <p>Email : donny@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 transaction">
              <h3>My Transaction</h3>
              <div class="box-transaction">
                <div class="row">
                  <div class="col-md-8">
                    <div class="list d-flex mb-3">
                      <img src="/images/coffee/hanami-latte.png" alt="coffee" className="coffee" />
                      <div class="detail-transaction ps-3">
                        <h6>Ice Coffee Latte</h6>
                        <p>Saturday 15 2021</p>
                        <p>Topping : boba</p>
                        <p>Price: 15.000</p>
                      </div>
                    </div>
                    <div class="list d-flex">
                      <img src="/images/coffee/hanami-latte.png" alt="coffee" className="coffee" />
                      <div class="detail-transaction ps-3">
                        <h6>Ice Coffee Latte</h6>
                        <p>Saturday 15 2021</p>
                        <p>Topping : boba</p>
                        <p>Price: 15.000</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} alt="logo" className="logo" />
                    <img src={barcode} alt="barcode" className="barcode mt-3 mb-3" />
                    <p>Sub Total : 60.000</p>
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

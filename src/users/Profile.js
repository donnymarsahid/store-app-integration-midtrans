import React from 'react';
import profile from '../assets/img/profile.png';
import logo from '../assets/img/logo-waysbucks.svg';
import barcode from '../assets/img/barcode.svg';

const Profile = () => {
  const dataUser = JSON.parse(localStorage.getItem('user_transaction'));
  const IMG_URL = '/images/coffee';
  console.log(dataUser.order);

  // if (dataUser.order.length === 0) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <h5>No Transaction</h5>
  //     </div>
  //   );
  // }

  const cardTransaction = dataUser.order.map((item) => {
    const topping = item.topping.map((topping) => <p>{topping},</p>);
    return (
      <div class="list d-flex mb-3">
        <img src="/images/coffee/hanami-latte.png" alt="coffee" className="coffee" />
        <div class="detail-transaction ps-3">
          <h6>{item.name}</h6>
          <p>Saturday 15 2021</p>
          <div class="topping d-flex">
            <p>Topping : </p>
            <p>{topping}</p>
          </div>
          <p>{item.price}</p>
        </div>
      </div>
    );
  });
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
                    <p>Full Name : {dataUser.fullname}</p>
                    <p>Email : {dataUser.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 transaction">
              <h3>My Transaction</h3>
              <div class="box-transaction">
                <div class="row">
                  <div class="col-md-8">{cardTransaction}</div>
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

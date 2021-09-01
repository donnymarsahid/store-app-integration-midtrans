import React from 'react';
import logo from '../assets/img/logo-waysbucks.svg';
import barcode from '../assets/img/barcode.svg';
import { useState } from 'react/cjs/react.development';

const Profile = () => {
  const dataUser = JSON.parse(localStorage.getItem('user_order'));
  const [uploadProfile, setUploadProfile] = useState('');
  const IMG_URL_PROFILE = '/images/';
  const IMG_URL = '/images/coffee/';

  if (uploadProfile !== '') {
    localStorage.setItem(
      'user_order',
      JSON.stringify({
        ...dataUser,
        image: uploadProfile,
      })
    );
    window.location.reload();
  }

  const totalArray = [];
  const total = [];

  const cardTransaction = dataUser.order.map((item) => {
    totalArray.push(item.subtotal);
    const resultTotal = totalArray.reduce((acc, curr) => acc + curr);
    const topping = item.topping.map((topping) => <p>{topping},</p>);
    const parsingTotal = resultTotal
      .toString()
      .split('')
      .reverse()
      .join('')
      .match(/\d{1,3}/g)
      .join('.')
      .split('')
      .reverse()
      .join('');

    const parsingSubtotal = item.subtotal
      .toString()
      .split('')
      .reverse()
      .join('')
      .match(/\d{1,3}/g)
      .join('.')
      .split('')
      .reverse()
      .join('');

    total.push(parsingTotal);
    return (
      <div class="list d-flex mb-3">
        <img src={`${IMG_URL}${item.image}`} alt="coffee" className="coffee" />
        <div class="detail-transaction ps-3">
          <h6>{item.name}</h6>
          <p>{item.date}</p>
          <div class="topping d-flex">
            <p>Topping : </p>
            <p>{topping}</p>
          </div>
          <p>{parsingSubtotal}</p>
        </div>
      </div>
    );
  });
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
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    className="d-none"
                    onChange={(e) => {
                      setUploadProfile(e.target.files[0].name);
                    }}
                  />
                  <label for="upload">
                    <img src={`${IMG_URL_PROFILE}${dataUser.image}`} alt="profile" className="profile" />
                  </label>
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
                    <p>Sub Total : Rp. {total[1]}</p>
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

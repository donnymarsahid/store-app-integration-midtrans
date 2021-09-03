import React, { useEffect } from 'react';
import uploadFile from '../../assets/img/upload-file.svg';
import emptyCart from '../../assets/img/empty-cart.svg';
import { Link } from 'react-router-dom';
import CardCart from './cardsProducts/CardCart';
import swal from 'sweetalert';
import { useContext, useState } from 'react/cjs/react.development';
import { context } from '../../App';
import convertRupiah from 'rupiah-format';

const CartPage = () => {
  return (
    <>
      <title>WaysBucks | Cart</title>
      <section className="cart-page">
        <div className="container">
          <form onSubmit="">
            <div className="row">
              <div className="title">
                <h1>My Cart</h1>
                <h5>Review Your Order</h5>
              </div>
              <div className="col-md-7">
                <div className="parent-list"></div>
                <div class="row">
                  <div class="col-md-8">
                    <div className="sub-total d-flex justify-content-between">
                      <div className="detail mt-3">
                        <p>Subtotal</p>
                        <p>Quantity</p>
                      </div>
                      <div className="detail-2 mt-3 text-end">
                        <p></p>
                        <p></p>
                      </div>
                    </div>
                    <div className="total d-flex justify-content-between">
                      <p>Total</p>
                      <p></p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <input type="file" name="image" id="upload" className="d-none" required o />
                    <label for="upload" className="upload-struck d-flex flex-column align-items-center justify-content-center">
                      <img src={uploadFile} alt="uploadFile" />
                      <p>Attache Of Transaction</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-5 d-flex flex-column">
                <input type="text" name="name" id="name" placeHolder="Name" className="mb-4" required />
                <input type="email" name="email" id="email" placeHolder="Email" className="mb-4" required />
                <input type="number" name="phone" id="phone" placeHolder="Phone" className="mb-4" required />
                <input type="number" name="postcode" id="postcode" placeHolder="Pos Code" className="mb-4" required />
                <textarea name="address" id="address" cols="30" rows="10" placeHolder="Address"></textarea>
                <button type="submit" className="btn-pay">
                  Pay
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CartPage;

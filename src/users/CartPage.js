import React from 'react';
import uploadFile from '../assets/img/upload-file.svg';
import emptyCart from '../assets/img/empty-cart.svg';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dataCart = JSON.parse(localStorage.getItem('user_transaction'));
  const IMG_URL = '/images/coffee/';
  const arrayTotal = [];
  const quantity = dataCart.order.length;

  if (dataCart.order.length === 0) {
    return (
      <section className="cart-page-null d-flex align-items-center justify-content-center flex-column">
        <img src={emptyCart} alt="empty-cart" width="150px" />
        <h1>Empty Cart :(</h1>
        <Link to="/all-menu">
          <button class="btn-empty">Order Now</button>
        </Link>
      </section>
    );
  }
  const listDataCart = dataCart.order.map((item, index) => {
    if (item.priceTopping.length === 0) {
      const parsingPrice = item.price
        .toString()
        .split('')
        .reverse()
        .join('')
        .match(/\d{1,3}/g)
        .join('.')
        .split('')
        .reverse()
        .join('');
      const handlerRemoveCart = () => {
        dataCart.order.splice(index, 1);
        console.log(index);
        localStorage.setItem('user_transaction', JSON.stringify(dataCart));
        window.location.reload();
      };
      arrayTotal.push(item.price);
      return (
        <div className="list-cart mb-3 d-flex align-items-center justify-content-between">
          <div className="image-description d-flex align-items-center">
            <img src={`${IMG_URL}${item.image}`} alt="" className="me-3" />
            <div className="description">
              <p className="text-capitalize">{item.name}</p>
            </div>
          </div>
          <div className="price-remove text-end">
            <p>Rp.{parsingPrice}</p>
            <i className="fas fa-trash" onClick={handlerRemoveCart}></i>
          </div>
        </div>
      );
    }
    const itemTopping = item.topping.map((topping) => <p>{topping},</p>);
    const amountToppingPrice = item.priceTopping.reduce((acc, curr) => {
      return acc + curr;
    });
    const amountCoffeTopping = amountToppingPrice + item.price;
    const parsingPrice = amountCoffeTopping
      .toString()
      .split('')
      .reverse()
      .join('')
      .match(/\d{1,3}/g)
      .join('.')
      .split('')
      .reverse()
      .join('');
    const handlerRemoveCart = () => {
      dataCart.order.splice(index, 1);
      console.log(index);
      localStorage.setItem('user_transaction', JSON.stringify(dataCart));
      window.location.reload();
    };
    arrayTotal.push(amountCoffeTopping);
    return (
      <div className="list-cart mb-3 d-flex align-items-center justify-content-between">
        <div className="image-description d-flex align-items-center">
          <img src={`${IMG_URL}${item.image}`} alt="" className="me-3" />
          <div className="description">
            <p className="text-capitalize">{item.name}</p>
            <p className="d-flex">Topping: {itemTopping}</p>
          </div>
        </div>
        <div className="price-remove text-end">
          <p>Rp.{parsingPrice}</p>
          <i className="fas fa-trash" onClick={handlerRemoveCart}></i>
        </div>
      </div>
    );
  });
  const amountArrayTotal = arrayTotal.reduce((acc, curr) => {
    return acc + curr;
  });

  const parsingPriceTotal = amountArrayTotal
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('');

  return (
    <>
      <section className="cart-page">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="title">
                <h1>My Cart</h1>
                <h5>Review Your Order</h5>
              </div>
              <div className="parent-list">{listDataCart}</div>
              <div class="row">
                <div class="col-md-8">
                  <div className="sub-total d-flex justify-content-between">
                    <div className="detail mt-3">
                      <p>Subtotal</p>
                      <p>Quantity</p>
                    </div>
                    <div className="detail-2 mt-3 text-end">
                      <p>Rp.{parsingPriceTotal}</p>
                      <p>{quantity}</p>
                    </div>
                  </div>
                  <div className="total d-flex justify-content-between">
                    <p>Total</p>
                    <p>Rp.{parsingPriceTotal}</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <input type="file" name="upload" id="upload" className="d-none" />
                  <label for="upload" className="upload-struck d-flex flex-column align-items-center justify-content-center">
                    <img src={uploadFile} alt="uploadFile" />
                    <p>Attache Of Transaction</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <form className="d-flex flex-column">
                <input type="text" name="name" id="name" placeHolder="Name" className="mb-4" required />
                <input type="email" name="email" id="email" placeHolder="Email" className="mb-4" required />
                <input type="number" name="phone" id="phone" placeHolder="Phone" className="mb-4" required />
                <input type="number" name="posCode" id="posCode" placeHolder="Pos Code" className="mb-4" required />
                <textarea name="address" id="address" cols="30" rows="10" placeHolder="Address"></textarea>
                <button type="submit" className="btn-pay">
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;

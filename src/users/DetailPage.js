import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import dataToppings from '../data/toppings.json';
import { useState } from 'react';
import $ from 'jquery';

const DetailPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [getTopping, setGetTopping] = useState('');
  const [statusTopping, setStatusTopping] = useState('');

  const dataAllCoffee = JSON.parse(localStorage.getItem('all_coffee'));
  const getDataUserTransaction = JSON.parse(localStorage.getItem('user_transaction'));

  const findAllCoffee = dataAllCoffee.find((data) => data.id === params.id);
  const [getPrice, setGetPrice] = useState(parseInt(findAllCoffee.price));
  const parsingPrice = getPrice
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('');

  const IMG_URL = '/images/coffee/';
  const IMG_URL_TOPPINGS = '/images/toppings/';

  const handlerPlus = () => {
    setQuantity(quantity + 1);
    setGetPrice(getPrice + parseInt(findAllCoffee.price));
  };
  const handlerMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setGetPrice(getPrice - parseInt(findAllCoffee.price));
    } else {
      setQuantity(quantity);
    }
  };

  const findTopping = dataToppings.find((data) => data.id === getTopping);
  if (findTopping !== undefined) {
    $('.click-topping').on('click', () => {
      setGetPrice(getPrice + parseInt(findTopping.price));
      setStatusTopping(`+${findTopping.price} ${findTopping.name}`);
      $('.cls.fas').addClass('fa-times-circle');
    });
    $('.fa-times-circle').on('click', () => {
      setGetPrice(getPrice - parseInt(findTopping.price));
      setStatusTopping('');
      $('.fa-times-circle').removeClass('fa-times-circle');
    });
  }

  const history = useHistory();

  const handlerAddCart = () => {
    localStorage.setItem(
      'user_transaction',
      JSON.stringify({
        ...getDataUserTransaction,
        order: [
          {
            name: findAllCoffee.name,
            price: getPrice,
            topping: findTopping.name,
          },
        ],
      })
    );
    history.push('/cart');
    window.location.reload();
  };

  const listToppings = dataToppings.map((topping) => {
    return (
      <div className="col-md-3 d-flex flex-column align-items-center">
        <img src={`${IMG_URL_TOPPINGS}${topping.image}`} alt={topping.image} />
        <p className="click-topping" onClick={() => setGetTopping(topping.id)}>
          {topping.name}
        </p>
      </div>
    );
  });

  return (
    <>
      <section className="detail-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src={`${IMG_URL}${findAllCoffee.image}`} alt={findAllCoffee.image} />
            </div>
            <div className="col-md-7">
              <h1 className="text-capitalize">{findAllCoffee.name}</h1>
              <p>Rp.{findAllCoffee.price}</p>
              <div className="toppings mt-3">
                <div className="row">{listToppings}</div>
              </div>
              <div className="quantity d-flex align-items-center mt-2">
                <button className="quantity" onClick={handlerMinus}>
                  -
                </button>
                <p className="m-0">{quantity}</p>
                <button className="quantity" onClick={handlerPlus}>
                  +
                </button>
              </div>
              <div className="total d-flex justify-content-lg-between mt-2">
                <h3>Total</h3>
                <p className="price-total">
                  <h4 className="text-end">Rp.{parsingPrice}</h4>
                  <p>
                    {statusTopping} <i class="cls fas" style={{ cursor: 'pointer' }}></i>{' '}
                  </p>
                </p>
              </div>
              <button className="btn-total" onClick={handlerAddCart}>
                Add Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;

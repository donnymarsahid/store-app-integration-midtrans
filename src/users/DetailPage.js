import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';

const DetailPage = () => {
  const date = moment(Date.now()).format('LL');
  const params = useParams();
  const history = useHistory();
  const [getTopping, setGetTopping] = useState([]);
  const [getPriceTopping, setGetPriceTopping] = useState([]);

  const dataToppings = JSON.parse(localStorage.getItem('toppings'));

  const dataAllCoffee = JSON.parse(localStorage.getItem('all_coffee'));
  const getDataUserTransaction = JSON.parse(localStorage.getItem('user_order'));

  const findAllCoffee = dataAllCoffee.find((data) => data.id === params.id);
  let [allPrice, setAllPrice] = useState(findAllCoffee.price);

  const parsingPrice = allPrice
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('');
  const allCoffePrice = findAllCoffee.price
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

  const handlerAddCart = () => {
    getDataUserTransaction.order.push({
      name: findAllCoffee.name,
      price: parseInt(findAllCoffee.price),
      image: findAllCoffee.image,
      topping: getTopping,
      priceTopping: getPriceTopping,
      subtotal: parseInt(allPrice),
      date: date,
    });
    localStorage.setItem('user_order', JSON.stringify(getDataUserTransaction));
    history.push('/cart-page');
    window.location.reload();
  };

  useEffect(() => {
    const selectToppings = document.querySelectorAll('.checkbox');
    let toppingArray = [];
    let toppingPrice = [];
    let priceAll = [parseInt(allPrice)];
    for (let checkbox of selectToppings) {
      checkbox.addEventListener('click', function () {
        if (this.checked === true) {
          toppingArray.push(this.name);
          toppingPrice.push(parseInt(this.value));
          setGetTopping(toppingArray);
          setGetPriceTopping(toppingPrice);
          priceAll.push(parseInt(this.value));
          const total = priceAll.reduce((acc, curr) => acc + curr);
          setAllPrice(total);
        }
        if (this.checked === false) {
          priceAll = priceAll.filter((data) => data !== parseInt(this.value));
          toppingArray = toppingArray.filter((data) => data !== this.name);
          toppingPrice = toppingPrice.filter((data) => data !== parseInt(this.value));
          setGetTopping(toppingArray);
          setGetPriceTopping(toppingPrice);
          const total = priceAll.reduce((acc, curr) => acc + curr);
          setAllPrice(total);
        }
      });
    }
  }, []);

  const listToppings = dataToppings.map((topping) => {
    return (
      <div className="col-md-3 d-flex flex-column align-items-center">
        <div class="box-check d-flex flex-column align-items-center">
          <input
            type="hidden"
            onChange={() => {
              setGetPriceTopping(topping.price);
            }}
          />
          <input type="checkbox" name={`${topping.name}`} value={`${topping.price}`} className="checkbox" />
          <img src={`${IMG_URL_TOPPINGS}${topping.image}`} alt={topping.image} />
          <label className="click-topping">{topping.name}</label>
        </div>
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
              <p>Rp.{allCoffePrice}</p>
              <form onSubmit={handlerAddCart}>
                <div className="toppings mt-3">
                  <div className="row">{listToppings}</div>
                </div>
                <div className="total d-flex justify-content-lg-between mt-2">
                  <h3>Total</h3>
                  <p className="price-total">
                    <h4 className="text-end">Rp.{parsingPrice}</h4>
                  </p>
                </div>
                <button className="btn-total" onClick="">
                  Add Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;

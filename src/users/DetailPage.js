import React from 'react';
import { useParams } from 'react-router-dom';
import dataCoffeeVariant from '../data/coffeeVariant.json';
import dataAllCoffee from '../data/allCoffee.json';
import dataToppings from '../data/toppings.json';

const DetailPage = () => {
  const params = useParams();

  console.log(params);
  const findCoffee = dataCoffeeVariant.find((data) => data.id === params.id);
  const findAllCoffee = dataAllCoffee.find((data) => data.id === params.id);

  const IMG_URL = '/images/coffee/';
  const IMG_URL_TOPPINGS = '/images/toppings/';

  const listToppings = dataToppings.map((topping) => {
    return (
      <div class="col-md-3 d-flex flex-column align-items-center">
        <img src={`${IMG_URL_TOPPINGS}${topping.image}`} alt={topping.image} />
        <p>{topping.name}</p>
      </div>
    );
  });

  if (findCoffee) {
    return (
      <>
        <section className="detail-page">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <img src={`${IMG_URL}${findAllCoffee.image}`} alt={findCoffee.image} />
              </div>
              <div className="col-md-7">
                <h1 className="text-capitalize">{findCoffee.name}</h1>
                <p>Rp.{findCoffee.price}</p>
                <div class="toppings mt-3">
                  <div class="row">{listToppings}</div>
                </div>
                <div class="total d-flex justify-content-lg-between mt-3">
                  <h3>Total</h3>
                  <p class="price-total">
                    <h4>Rp.23.000</h4>
                  </p>
                </div>
                <button>Add Cart</button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  if (findAllCoffee) {
    return (
      <>
        <h1 style={{ marginTop: '200px' }}>{findAllCoffee.name}</h1>
      </>
    );
  }
};

export default DetailPage;

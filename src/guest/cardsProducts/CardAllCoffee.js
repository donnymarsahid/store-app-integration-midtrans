import React from 'react';

const CardAllCoffee = ({ coffee }) => {
  const IMG_URL = 'images/coffee/';
  return (
    <>
      <div class="col-md-3 mb-4">
        <div class="box-card">
          <div class="image-card">
            <img src={`${IMG_URL}${coffee.image}`} alt={coffee.image} />
            <div class="overlay d-flex justify-content-center align-items-center">
              <button>ORDER NOW</button>
            </div>
          </div>
          <div class="description">
            <h5 class="text-capitalize">{coffee.name}</h5>
            <p>Rp.{coffee.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardAllCoffee;

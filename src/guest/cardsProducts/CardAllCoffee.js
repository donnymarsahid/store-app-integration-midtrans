import React from 'react';

const CardAllCoffee = ({ coffee }) => {
  const IMG_URL = 'images/coffee/';
  return (
    <>
      <div className="col-md-3 mb-4">
        <div className="box-card">
          <div className="image-card">
            <img src={`${IMG_URL}${coffee.image}`} alt={coffee.image} />
            <div className="overlay d-flex justify-content-center align-items-center">
              <button data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
                ORDER NOW
              </button>
            </div>
          </div>
          <div className="description">
            <h5 className="text-capitalize">{coffee.name}</h5>
            <p>Rp.{coffee.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardAllCoffee;

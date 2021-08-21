import React from 'react';

const CardCoffe = ({ coffee }) => {
  const IMG_URL = 'images/coffee/';

  const parsingPrice = coffee.price
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
      <div className="col-md-3">
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
            <p>Rp.{parsingPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCoffe;

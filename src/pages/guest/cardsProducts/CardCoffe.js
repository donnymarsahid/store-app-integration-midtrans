import React from 'react';
import convertRupiah from 'rupiah-format';

const CardCoffe = ({ coffee }) => {
  const parsingPrice = convertRupiah.convert(coffee.price);

  return (
    <>
      <div className="col-md-3 mb-3">
        <div className="box-card">
          <div className="image-card">
            <img src={coffee.image} alt={coffee.image} />
            <div className="overlay d-flex justify-content-center align-items-center">
              <button data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
                ORDER NOW
              </button>
            </div>
          </div>
          <div className="description">
            <h5 className="text-capitalize">{coffee.title}</h5>
            <p>{parsingPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCoffe;

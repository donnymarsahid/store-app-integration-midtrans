import React from 'react';
import { Link } from 'react-router-dom';

const CardCoffe = ({ coffee }) => {
  const IMG_URL = 'images/coffee/';
  return (
    <>
      <div className="col-md-3">
        <div className="box-card">
          <div className="image-card">
            <img src={`${IMG_URL}${coffee.image}`} alt={coffee.image} />
            <div className="overlay d-flex justify-content-center align-items-center">
              <Link to="/login">
                <button>ORDER NOW</button>
              </Link>
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

export default CardCoffe;

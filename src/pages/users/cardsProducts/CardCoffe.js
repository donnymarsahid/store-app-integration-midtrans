import React from 'react';
import { Link } from 'react-router-dom';
import convertRupiah from 'rupiah-format';

const CardCoffe = ({ coffee }) => {
  function handlerWhistlist() {
    document.querySelector(`.btn${coffee.id}`).classList.toggle('click-whistlist');
  }

  const parsingPrice = convertRupiah.convert(coffee.price);

  return (
    <>
      <div className="col-md-3 mb-3">
        <div className="box-card">
          <div className="image-card">
            <img src={coffee.image} alt={coffee.image} />
            <div className="overlay d-flex justify-content-center align-items-center">
              <Link to={`/detail-page/${coffee.id}`}>
                <button>ORDER NOW</button>
              </Link>
            </div>
            <div className="whistlist d-flex align-items-center justify-content-center">
              <button className={`btn${coffee.id}`} onClick={handlerWhistlist}>
                <i className="far fa-heart"></i>
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

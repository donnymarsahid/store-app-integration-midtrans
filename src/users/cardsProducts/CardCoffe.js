import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const CardCoffe = ({ coffee }) => {
  const IMG_URL = 'images/coffee/';

  function handlerWhistlist() {
    $(`.btn${coffee.id}`).toggleClass('click-whistlist');
  }
  return (
    <>
      <div class="col-md-3">
        <div class="box-card">
          <div class="image-card">
            <img src={`${IMG_URL}${coffee.image}`} alt={coffee.image} />
            <div class="overlay d-flex justify-content-center align-items-center">
              <Link to={`/cart/${coffee.id}`}>
                <button>ORDER NOW</button>
              </Link>
            </div>
            <div class="whistlist d-flex align-items-center justify-content-center">
              <button class={`btn${coffee.id}`} onClick={handlerWhistlist}>
                <i class="far fa-heart"></i>
              </button>
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

export default CardCoffe;
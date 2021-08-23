import React from 'react';

const CardCart = ({ item, parsingPrice, handlerRemoveCart, itemTopping }) => {
  const IMG_URL = '/images/coffee/';
  return (
    <div className="list-cart mb-3 d-flex align-items-center justify-content-between">
      <div className="image-description d-flex align-items-center">
        <img src={`${IMG_URL}${item.image}`} alt="" className="me-3" />
        <div className="description">
          <p className="text-capitalize">{item.name}</p>
          <div class="topping d-flex flex-row">
            <p>Topping: </p>
            <p> {itemTopping}</p>
          </div>
        </div>
      </div>
      <div className="price-remove text-end">
        <p>Rp.{parsingPrice}</p>
        <i className="fas fa-trash" onClick={handlerRemoveCart}></i>
      </div>
    </div>
  );
};

export default CardCart;

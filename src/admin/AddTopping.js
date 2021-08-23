import React from 'react';
import './css/style.css';
import clip from '../assets/img/clip.svg';
import { useContext, useState } from 'react';
import { context } from '../App';
import { useHistory } from 'react-router';

const AddTopping = () => {
  const history = useHistory();
  const { addToppings } = useContext(context);
  const [newTopping, setNewTopping] = useState({
    name: '',
    price: '',
    image: '',
  });

  const IMG_URL = '/images/toppings/';
  const { name, price, image } = newTopping;
  const upload = localStorage.getItem('add_product');

  const handlerInput = (e) => {
    setNewTopping({ ...newTopping, [e.target.name]: e.target.value });
  };
  const handlerFile = (e) => {
    setNewTopping({ ...newTopping, [e.target.name]: e.target.files[0].name });
  };

  if (image !== '') {
    localStorage.setItem('add_product', image);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('add_product', 'upload.png');
    addToppings(name, price, image);
    history.push('/admin');
  };

  return (
    <>
      <section className="add-product">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <h1>Topping</h1>
              <form className="d-flex flex-column" onSubmit={handlerSubmit}>
                <input type="text" name="name" id="name" placeHolder="Name Product" onChange={(e) => handlerInput(e)} />
                <input type="number" name="price" id="price" placeHolder="Price" className="mt-4 mb-4" onChange={(e) => handlerInput(e)} />
                <input type="file" name="image" id="image" className="d-none" onChange={(e) => handlerFile(e)} />
                <label for="image" className="label-upload mb-4 d-flex justify-content-between">
                  Photo Topping
                  <img src={clip} alt="clip" width="15px" />
                </label>
                <button class="btn-add-product" type="submit">
                  Add Topping
                </button>
              </form>
            </div>
            <div class="col-md-5 d-flex justify-content-center align-items-center">
              <img src={`${IMG_URL}${upload}`} alt="topping" className="img-upload" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTopping;

import React from 'react';
import './css/style.css';
import clip from '../assets/img/clip.svg';
import { useContext, useState } from 'react';
import { context } from '../App';
import { useHistory } from 'react-router';

const AddProduct = () => {
  const history = useHistory();
  const { addCoffee } = useContext(context);
  const [newCoffee, setNewCoffee] = useState({
    name: '',
    price: '',
    image: '',
  });

  const IMG_URL = '/images/coffee/';
  const { name, price, image } = newCoffee;
  const upload = localStorage.getItem('add_product');

  const handlerInput = (e) => {
    setNewCoffee({ ...newCoffee, [e.target.name]: e.target.value });
  };
  const handlerFile = (e) => {
    setNewCoffee({ ...newCoffee, [e.target.name]: e.target.files[0].name });
  };

  if (image !== '') {
    localStorage.setItem('add_product', image);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('add_product', 'upload.png');
    addCoffee(name, price, image);
    history.push('/admin');
  };

  return (
    <>
      <section className="add-product">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <h1>Products</h1>
              <form className="d-flex flex-column" onSubmit={handlerSubmit}>
                <input type="text" name="name" id="name" placeHolder="Name Product " onChange={(e) => handlerInput(e)} />
                <input type="number" name="price" id="price" placeHolder="Price" className="mt-4 mb-4" onChange={(e) => handlerInput(e)} />
                <input type="file" name="image" id="image" className="d-none" onChange={(e) => handlerFile(e)} />
                <label for="image" className="label-upload mb-4 d-flex justify-content-between">
                  Photo Product
                  <img src={clip} alt="clip" width="15px" />
                </label>
                <button class="btn-add-product" type="submit">
                  Add Product
                </button>
              </form>
            </div>
            <div class="col-md-5 d-flex justify-content-center align-items-center">
              <img src={`${IMG_URL}${upload}`} alt="coffee" className="img-upload" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;

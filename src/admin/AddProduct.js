import React from 'react';
import './css/style.css';
import clip from '../assets/img/clip.svg';

const AddProduct = () => {
  return (
    <>
      <section className="add-product">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <h1>Products</h1>
              <form className="d-flex flex-column">
                <input type="text" name="name" id="name" placeHolder="Name Product" />
                <input type="number" name="price" id="price" placeHolder="Price" className="mt-4 mb-4" />
                <input type="file" name="upload" id="upload" className="d-none" />
                <label for="upload" className="label-upload mb-4 d-flex justify-content-between">
                  Photo Product
                  <img src={clip} alt="clip" width="15px" />
                </label>
                <button class="btn-add-product" type="submit">
                  Add Product
                </button>
              </form>
            </div>
            <div class="col-md-5 d-flex justify-content-center">
              <img src="/images/coffee/hanami-latte.png" alt="coffee" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;

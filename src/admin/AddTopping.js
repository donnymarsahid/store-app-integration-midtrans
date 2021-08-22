import React from 'react';
import './css/style.css';
import clip from '../assets/img/clip.svg';

const AddTopping = () => {
  return (
    <>
      <section className="add-product add-topping">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <h1>Topping</h1>
              <form className="d-flex flex-column">
                <input type="text" name="name" id="name" placeHolder="Name Product" />
                <input type="number" name="price" id="price" placeHolder="Price" className="mt-4 mb-4" />
                <input type="file" name="upload" id="upload" className="d-none" />
                <label for="upload" className="label-upload mb-4 d-flex justify-content-between">
                  Photo Topping
                  <img src={clip} alt="clip" width="15px" />
                </label>
                <button class="btn-add-product" type="submit">
                  Add Topping
                </button>
              </form>
            </div>
            <div class="col-md-5 d-flex justify-content-center">
              <img src="/images/toppings/kiwi-popping-pearl.svg" alt="topping" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTopping;

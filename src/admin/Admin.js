import React from 'react';
import addProduct from '../assets/img/add-product.svg';
import addTopping from '../assets/img/add-topping.svg';
import transaction from '../assets/img/transaction.svg';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <section className="admin">
        <div class="container">
          <h1 className="text-center">Admin Waysbucks</h1>
          <div class="row">
            <div class="col-md-4">
              <Link to="/admin/income-transaction" className="text-decoration-none">
                <div width="18rem">
                  <img src={transaction} class="card-img-top" alt="transaction" />
                  <div class="card-body">
                    <h5 class="card-title">Income Transaction</h5>
                    <p class="card-text">breakdown of income from sales</p>
                    <button>Income Transaction</button>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-md-4">
              <Link to="/admin/add-product" className="text-decoration-none">
                <div width="18rem">
                  <img src={addProduct} class="card-img-top" alt="add-product" />
                  <div class="card-body">
                    <h5 class="card-title">Add Product</h5>
                    <p class="card-text">add new coffee product</p>
                    <button>Add Product</button>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-md-4">
              <Link to="/admin/add-topping" className="text-decoration-none">
                <div width="18rem">
                  <img src={addTopping} class="card-img-top" alt="add-topping" />
                  <div class="card-body">
                    <h5 class="card-title">Add Topping</h5>
                    <p class="card-text">add a variety of coffee toppings</p>
                    <button>Add Topping</button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;

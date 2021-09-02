import React from 'react';
import product from '../../assets/img/product.svg';
import topping from '../../assets/img/topping.svg';
import incomeTransaction from '../../assets/img/income-transaction.svg';
import chartsDonnut from '../../assets/img/charts-donnut.svg';
import twitter from '../../assets/img/icon-twitter.svg';
import facebook from '../../assets/img/icon-facebook.svg';
import instagram from '../../assets/img/icon-instagram.svg';
import diagram from '../../assets/img/diagram.png';
import users from '../../assets/img/users.svg';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <section className="admin">
        <div class="container">
          <div class="row d-flex justify-content-between">
            <div class="col-md-4 box box-income-transaction d-flex justify-content-between">
              <div class="d-flex flex-column justify-content-between info">
                <div className="title">
                  <p class="text-uppercase m-0">Income Transaction</p>
                  <p>Total : 10</p>
                </div>
                <div class="check">
                  <Link to="/" class="link-router">
                    <p className="text-decoration-underline m-0">check details</p>
                  </Link>
                </div>
              </div>
              <div class="icon d-flex flex-column justify-content-md-end">
                <img src={incomeTransaction} alt="income-transaction" />
              </div>
            </div>
            <div class="col-md-4 box box-product d-flex justify-content-between">
              <div class="d-flex flex-column justify-content-between info">
                <div className="title">
                  <p class="text-uppercase m-0">Product</p>
                  <p>Total : 20</p>
                </div>
                <div class="check">
                  <Link to="/" class="link-router">
                    <p className="text-decoration-underline m-0">check details</p>
                  </Link>
                </div>
              </div>
              <div class="icon d-flex flex-column justify-content-md-end">
                <img src={product} alt="income-transaction" />
              </div>
            </div>
            <div class="col-md-4 box box-topping d-flex justify-content-between">
              <div class="d-flex flex-column justify-content-between info">
                <div className="title">
                  <p class="text-uppercase m-0">Topping</p>
                  <p>Total : 8</p>
                </div>
                <div class="check">
                  <Link to="/" class="link-router">
                    <p className="text-decoration-underline m-0">check details</p>
                  </Link>
                </div>
              </div>
              <div class="icon d-flex flex-column justify-content-md-end">
                <img src={topping} alt="income-transaction" />
              </div>
            </div>
          </div>
          <div class="row social-media d-flex justify-content-between mt-5">
            <div class="col-md-4 p-0 pe-3">
              <div class="box-sosmed d-flex justify-content-between align-items-center">
                <img src={chartsDonnut} alt="charts-donnut" />
                <p class="text-uppercase m-0">Twitter Tweets</p>
                <img src={twitter} alt="twitter" />
              </div>
            </div>
            <div class="col-md-4 pe-3 ps-3">
              <div class="box-sosmed d-flex justify-content-between align-items-center">
                <img src={chartsDonnut} alt="charts-donnut" />
                <p class="text-uppercase m-0">Facebook Followers</p>
                <img src={facebook} alt="facebook" />
              </div>
            </div>
            <div class="col-md-4 p-0 ps-3">
              <div class="box-sosmed d-flex justify-content-between align-items-center">
                <img src={chartsDonnut} alt="charts-donnut" />
                <p class="text-uppercase m-0">Instagram Followers</p>
                <img src={instagram} alt="instagram" />
              </div>
            </div>
          </div>
          <div class="diagram-users">
            <div class="row diagram-users d-flex justify-content-between mt-5">
              <div class="col-md-8 diagram">
                <img src={diagram} alt="charts" class="img-fluid" />
              </div>
              <div class="col-md-4 box box-users d-flex justify-content-between">
                <div class="d-flex flex-column justify-content-between info">
                  <div className="title">
                    <p class="text-uppercase m-0">Users WaysBucks</p>
                    <p>Total : 20</p>
                  </div>
                  <div class="check">
                    <Link to="/" class="link-router">
                      <p className="text-decoration-underline m-0">check details</p>
                    </Link>
                  </div>
                </div>
                <div class="icon d-flex flex-column justify-content-md-end">
                  <img src={users} alt="income-transaction" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
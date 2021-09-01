import React from 'react';
import store from '../assets/img/merchant-waysbucks.png';
import coffeeJourney from '../assets/img/coffee-journey.svg';
import Login from '../access/Login';
import Register from '../access/Register';

const Store = () => {
  return (
    <>
      <title>WaysBucks | Store</title>
      <section class="store">
        <div class="container">
          <div class="location">
            <div class="container">
              <div class="row">
                <h3>Store</h3>
                <div class="col-md-6">
                  <img src={store} alt="merchant-waysbucks" />
                </div>
                <div class="col-md-6 d-flex">
                  <div class="icon me-2">
                    <h3>
                      <i class="fas fa-map-marker-alt"></i>
                    </h3>
                  </div>
                  <div class="detail">
                    <h3>WaysBucks Coffee, Jakarta City</h3>
                    <p>WaysBucks Coffee, in Road tomang number 23, RT.03/RW.07, west jakarta city, districts palmerah, ward Jatipulo, Post Code 11430</p>
                    <p>Open every day</p>
                    <p>
                      <i class="fas fa-clock"></i> 08:00AM - 21:00PM
                    </p>
                    <p>
                      <a href="/store" className="text-decoration-none">
                        <i class="fas fa-envelope"></i> waysbuckscoffee@gmail.com
                      </a>
                    </p>
                    <p>
                      <a href="/store" className="text-decoration-none">
                        <i class="fas fa-phone"></i> 0838-7223-9021
                      </a>
                    </p>
                    <div class="google-maps">
                      <iframe
                        title="location waysbucks"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.743262628099!2d106.78790077041022!3d-6.172803545112276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f660d0866193%3A0x9f26e23cd7e3c120!2sTomang%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1630503627792!5m2!1sid!2sid"
                        width="400"
                        height="350"
                        style={{ border: '0' }}
                        allowfullscreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="about-store text-center">
          <div class="container d-flex justify-content-center align-items-center flex-column">
            <h3>About WaysBucks</h3>
            <p>
              waybucks is a coffee selling business located in Jakarta which was established in 2021, waybucks provides various kinds of coffee and toppings, waybucks can be accessed through the website or come to the store, and accept
              delivery orders.
            </p>
            <div class="box-coffee-journey">
              <img src={coffeeJourney} alt="coffee-journey" />
              <p class="title">Coffee Journey</p>
              <p>
                At WaysBucks, we make sure you have the best coffee experience. We work relentlessly to guarantee we deliver on our promise. From harvest, tasting, roasting and working together with the producers in Indonesia to produce the
                best crop to our customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default Store;

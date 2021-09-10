import React from 'react';
import Login from '../access/Login';
import Register from '../access/Register';
import CardCoffe from './cardsProducts/CardCoffe';

const Coffee = () => {
  return (
    <>
      <title>WaysBucks | Coffee Variant</title>
      <div class="page-contact d-flex align-items-center justify-content-center flex-column">
        <h3>Any Question ?</h3>
        <p>Contact us via</p>
        <div class="email d-flex flex-column border-lg">
          <i class="fas fa-envelope text-center"></i>
          <a href="mailto:donnymrshd.94@gmail.com" class="ms-2">
            waysbucks.coffee@gmail.com
          </a>
        </div>
        <div class="telp d-flex flex-column border-lg">
          <i class="fab fa-whatsapp text-center"></i>
          <a href="https://api.whatsapp.com/send?phone=6283872239021&text=Hallo%20Donny" class="ms-2" target="blank">
            Click Here!
          </a>
        </div>
      </div>
      <Login />
      <Register />
    </>
  );
};

export default Coffee;

import React, { useContext } from 'react';
import './css/style.css';
import imgHeader from '../assets/img/img-header.png';
import { context } from '../App';
import CardCoffe from './cardsProducts/CardCoffe';

const Guest = () => {
  const { dataCoffee } = useContext(context);

  const cardCoffee = dataCoffee.map((coffee) => {
    return <CardCoffe coffee={coffee} key={coffee.id} />;
  });
  return (
    <>
      <header>
        <div class="container d-flex align-items-center">
          <div class="jumbotron">
            <h1 class="mb-3">WAYSBUCKS</h1>
            <p>Things are changing, but we’re still here for you</p>
            <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
            <button class="btn-order">LETS ORDER</button>
          </div>
          <div class="img-header">
            <img src={imgHeader} alt="header-waysbucks" />
          </div>
        </div>
      </header>
      <section class="varian">
        <div class="container">
          <h3>Coffee Variant</h3>
          <div class="row">{cardCoffee}</div>
        </div>
      </section>
    </>
  );
};

export default Guest;

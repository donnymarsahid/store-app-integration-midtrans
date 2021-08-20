import React, { useContext } from 'react';
import './css/style.css';
import imgHeader from '../assets/img/img-header.png';
import { context } from '../App';
import CardCoffe from './cardsProducts/CardCoffe';
import { Link } from 'react-router-dom';

const Guest = () => {
  const { coffeeVariant } = useContext(context);

  const cardCoffee = coffeeVariant.map((coffee) => {
    return <CardCoffe coffee={coffee} key={coffee.id} />;
  });
  return (
    <>
      <header>
        <div className="container d-flex align-items-center">
          <div className="jumbotron">
            <h1 className="mb-3">WAYSBUCKS</h1>
            <p>Things are changing, but we’re still here for you</p>
            <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
            <Link to="/all-menu">
              <button className="btn-order">LETS ORDER</button>
            </Link>
          </div>
          <div className="img-header">
            <img src={imgHeader} alt="header-waysbucks" />
          </div>
        </div>
      </header>
      <section className="varian">
        <div className="container">
          <h3>Coffee Variant</h3>
          <div className="row">{cardCoffee}</div>
        </div>
      </section>
    </>
  );
};

export default Guest;

import React, { useContext } from 'react';
import Login from '../access/Login';
import Register from '../access/Register';
import { context } from '../App';
import CardCoffe from './cardsProducts/CardCoffe';

const BestSeller = () => {
  const { coffeeVariant } = useContext(context);

  const cardCoffee = coffeeVariant.map((coffee) => {
    return <CardCoffe coffee={coffee} key={coffee.id} />;
  });
  return (
    <>
      <section className="varian coffee">
        <div className="container">
          <h3>Coffee Variant</h3>
          <div className="row">{cardCoffee}</div>
        </div>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default BestSeller;

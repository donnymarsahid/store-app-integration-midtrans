import React, { useContext } from 'react';
import { context } from '../App';
import CardCoffe from './cardsProducts/CardCoffe';

const Coffee = () => {
  const { coffeeVariant } = useContext(context);

  const cardCoffee = coffeeVariant.map((coffee) => {
    return <CardCoffe coffee={coffee} key={coffee.id} />;
  });
  return (
    <>
      <section class="varian coffee">
        <div class="container">
          <h3>Coffee Variant</h3>
          <div class="row">{cardCoffee}</div>
        </div>
      </section>
    </>
  );
};

export default Coffee;

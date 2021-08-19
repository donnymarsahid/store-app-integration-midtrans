import React, { useContext } from 'react';
import { context } from '../App';
import CardAllCoffee from './cardsProducts/CardAllCoffee';
import './css/style.css';

const AllMenu = () => {
  const { allCoffee } = useContext(context);

  const cardsAllCoffee = allCoffee.map((coffee) => {
    return <CardAllCoffee coffee={coffee} key={coffee.id} />;
  });
  return (
    <>
      <section class="all-menu varian">
        <div class="container">
          <h3>All Menu</h3>
          <div class="row">{cardsAllCoffee}</div>
        </div>
      </section>
    </>
  );
};

export default AllMenu;

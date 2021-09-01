import React, { useContext } from 'react';
import Login from '../access/Login';
import Register from '../access/Register';
import { context } from '../../App';
import CardAllCoffee from './cardsProducts/CardAllCoffee';
import './css/style.css';

const AllMenu = () => {
  const { allCoffee } = useContext(context);

  const cardsAllCoffee = allCoffee.map((coffee) => {
    return <CardAllCoffee coffee={coffee} key={coffee.id} />;
  });
  return (
    <>
      <title>WaysBucks | All Menu</title>
      <section className="all-menu varian">
        <div className="container">
          <h3>All Menu</h3>
          <div className="row">{cardsAllCoffee}</div>
        </div>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default AllMenu;

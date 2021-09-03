import React from 'react';
import Login from '../access/Login';
import Register from '../access/Register';
import CardAllCoffee from './cardsProducts/CardAllCoffee';
import './css/style.css';
import { useQuery } from 'react-query';
import { getProducts } from '../../config/api';
import FadeLoader from 'react-spinners/FadeLoader';
import { useState } from 'react';

const AllMenu = () => {
  let [loading] = useState(true);
  let [color] = useState('#BD0707');

  const { data: products, isLoading, error } = useQuery('productsCache', getProducts);

  if (isLoading)
    return (
      <div className="custom-status">
        <div className="custom-status">
          <FadeLoader color={color} loading={loading} size={50} />
        </div>
      </div>
    );

  if (error) return <div className="custom-status">Error fetching data</div>;

  return (
    <>
      <title>WaysBucks | All Menu</title>
      <section className="all-menu varian">
        <div className="container">
          <h3>All Menu</h3>
          <div className="row">
            {products.map((data) => (
              <CardAllCoffee coffee={data} key={data.id} />
            ))}
          </div>
        </div>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default AllMenu;

import React from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../../config/api';
import CardAllCoffee from './cardsProducts/CardAllCoffee';
import './css/style.css';
import loading from '../../assets/img/loading.gif';

const AllMenu = () => {
  const { data: products, isLoading, error } = useQuery('productsCache', getProducts);

  if (isLoading) {
    return (
      <div className="custom-status">
        <img src={loading} alt="load" width="100px" />
      </div>
    );
  }

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
    </>
  );
};

export default AllMenu;

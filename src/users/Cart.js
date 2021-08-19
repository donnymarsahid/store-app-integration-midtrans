import React from 'react';
import { useParams } from 'react-router-dom';
import dataCoffeeVariant from '../data/coffeeVariant.json';
import dataAllCoffee from '../data/allCoffee.json';

const Cart = () => {
  const params = useParams();

  console.log(params);
  const findCoffee = dataCoffeeVariant.find((data) => data.id === params.id);
  const findAllCoffee = dataAllCoffee.find((data) => data.id === params.id);

  if (findCoffee) {
    return (
      <>
        <h1 style={{ marginTop: '200px' }}>{findCoffee.name}</h1>
      </>
    );
  }
  if (findAllCoffee) {
    return (
      <>
        <h1 style={{ marginTop: '200px' }}>{findAllCoffee.name}</h1>
      </>
    );
  }
};

export default Cart;

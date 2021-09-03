import React from 'react';
import { useQuery } from 'react-query';
import { getTypeCoffee } from '../../config/api';
import Login from '../access/Login';
import Register from '../access/Register';
import CardCoffe from './cardsProducts/CardCoffe';
import FadeLoader from 'react-spinners/FadeLoader';

const Coffee = () => {
  const { data: typeCoffee, isLoading, error } = useQuery('typeCoffeeCache', getTypeCoffee);

  if (isLoading)
    return (
      <div className="custom-status">
        <div className="custom-status">
          <FadeLoader color={'#BD0707'} loading={true} size={60} />
        </div>
      </div>
    );

  if (error) return <div className="custom-status">Error fetching data</div>;

  return (
    <>
      <title>WaysBucks | Coffee Variant</title>
      <section className="varian coffee">
        <div className="container">
          <h3>Coffee Variant</h3>
          <div className="row">
            {typeCoffee.map((data) => (
              <CardCoffe coffee={data} key={data.id} />
            ))}
          </div>
        </div>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default Coffee;

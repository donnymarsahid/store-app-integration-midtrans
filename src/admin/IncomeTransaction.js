import React from 'react';
import './css/style.css';
import success from '../assets/img/success.svg';
import cancel from '../assets/img/cancel.svg';
import { useContext } from 'react/cjs/react.development';
import { context } from '../App';

const IncomeTransaction = () => {
  const { transaction } = useContext(context);

  const IMG_URL = '/images/actions/';

  const cardTransaction = transaction.map((data) => {
    return (
      <tr>
        <th scope="row">2</th>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.postcode}</td>
        <td>{data.income}</td>
        <td>{data.status}</td>
        <td className="text-center">
          <img src={`${IMG_URL}${data.action}`} alt={data.action} />
        </td>
      </tr>
    );
  });
  return (
    <>
      <section className="income-transaction">
        <div class="container">
          <h1 className="mb-3">Income Transaction</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Post Code</th>
                <th scope="col">Income</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{cardTransaction}</tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default IncomeTransaction;

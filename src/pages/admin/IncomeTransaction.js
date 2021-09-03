import React from 'react';
import './css/style.css';

const IncomeTransaction = () => {
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
            <tbody></tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default IncomeTransaction;

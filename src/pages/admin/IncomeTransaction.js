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
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Ansel Ma Putri</td>
                <td>Jln. Tanjung Duren</td>
                <td>11430</td>
                <td className="column-price">Rp. 38.000,00</td>
                <td className="income waiting">waiting approve</td>
                <td className="text-center">
                  <button className="me-2 btn-cancel" onClick="">
                    cancel
                  </button>
                  <button className="btn-approve" onClick="">
                    approve
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Nathalie</td>
                <td>Jln. Tomang</td>
                <td>11230</td>
                <td className="column-price">Rp. 28.000,00</td>
                <td className="income success">success</td>
                <td className="text-center">
                  <img src="/images/actions/success.svg" alt="action" className="img-action" />
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Ariel Tatum</td>
                <td>Jln. Kemanggisan</td>
                <td>12440</td>
                <td className="column-price">Rp. 30.000,00</td>
                <td className="income cancel">cancel</td>
                <td className="text-center">
                  <img src="/images/actions/cancel.svg" alt="action" className="img-action" />
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Gal Gadot</td>
                <td>Jln. Bidara</td>
                <td>52230</td>
                <td className="column-price">Rp. 45.000,00</td>
                <td className="income on">on the way</td>
                <td className="text-center">
                  <img src="/images/actions/success.svg" alt="action" className="img-action" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default IncomeTransaction;

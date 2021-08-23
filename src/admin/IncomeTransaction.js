import React from 'react';
import './css/style.css';
import { useContext } from 'react/cjs/react.development';
import { context } from '../App';
import swal from 'sweetalert';

const IncomeTransaction = () => {
  const { transaction } = useContext(context);

  const IMG_URL = '/images/actions/';

  const cardTransaction = transaction.map((data, index) => {
    const handlerApprove = () => {
      const findApprove = transaction.find((data) => data.action === '');
      swal({
        title: 'Success Approve',
        text: 'checked status',
        icon: 'success',
        button: 'Aww yiss!',
      });
      transaction.splice(index, 1);
      findApprove.status = 'success';
      findApprove.action = 'success.svg';
      localStorage.setItem('user_transaction', JSON.stringify([...transaction, findApprove]));
      window.location.reload();
    };

    const handlerCancel = () => {
      swal({
        title: 'Are you cancel order?',
        text: 'Once deleted, you will not be able to recover this imaginary order',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const findApprove = transaction.find((data) => data.action === '');
          transaction.splice(index, 1);
          findApprove.status = 'cancel';
          findApprove.action = 'cancel.svg';
          localStorage.setItem('user_transaction', JSON.stringify([...transaction, findApprove]));
          window.location.reload();
        } else {
          swal('Your imaginary file is safe!');
        }
      });
    };

    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.postcode}</td>
        <td>{data.income}</td>
        <td>{data.status}</td>
        <td className="text-center">
          {data.action === '' && (
            <>
              <button className="me-2 btn-cancel" onClick={handlerCancel}>
                cancel
              </button>
              <button className="btn-approve" onClick={handlerApprove}>
                approve
              </button>
            </>
          )}
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

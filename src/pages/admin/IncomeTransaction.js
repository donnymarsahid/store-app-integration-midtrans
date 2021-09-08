import React, { useState } from 'react';
import './css/style.css';
import { API, getTransactions } from '../../config/api';
import { useMutation, useQuery } from 'react-query';
import { convert } from 'rupiah-format';
import swal from 'sweetalert';

const IncomeTransaction = () => {
  const { data: transactions, refetch } = useQuery('getTransactionsCache', getTransactions);
  const array = [];

  const handlerOnTheWay = useMutation(async (id) => {
    try {
      const body = JSON.stringify({ status: 'on the way' });
      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.token,
        },
        body,
      };

      swal({
        title: 'Transaction already entered?',
        icon: 'success',
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await API().put('/transaction/' + id, config);
          refetch();
          swal('Poof! Your imaginary file has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('transaction waiting approve');
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  const handlerCancel = useMutation(async (id) => {
    try {
      const body = JSON.stringify({ status: 'cancel' });
      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.token,
        },
        body,
      };
      swal({
        title: 'Are you sure cancel?',
        text: 'transaction will be canceled!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await API().put('/transaction/' + id, config);
          refetch();
          swal('Transaction has been deleted', {
            icon: 'success',
          });
        } else {
          swal('Safe transaction data stored');
        }
      });
    } catch (error) {
      console.log(error);
    }
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
            <tbody>
              {transactions?.map((data) => {
                const dataTransaction = data.transactions.map((transaction) => {
                  array.push(transaction);

                  const indexTransaction = array.map((data, index) => index + 1);

                  return (
                    <tr>
                      <th scope="row">{indexTransaction.length}</th>
                      <td>{transaction.name}</td>
                      <td>{transaction.address}</td>
                      <td>{transaction.posCode}</td>
                      <td className="column-price">{convert(transaction.total)}</td>
                      <td className={`income ${transaction.status}`}>{transaction.status}</td>
                      <td className="text-center">
                        {transaction.status === 'waiting approve' && (
                          <>
                            <button
                              className="me-2 btn-cancel"
                              onClick={() => {
                                handlerCancel.mutate(transaction.id);
                              }}
                            >
                              cancel
                            </button>
                            <button
                              className="btn-approve"
                              onClick={() => {
                                handlerOnTheWay.mutate(transaction.id);
                              }}
                            >
                              approve
                            </button>
                          </>
                        )}
                        {transaction.status === 'on the way' && (
                          <>
                            <img src="/images/actions/success.svg" alt="icon-success" className="img-action" />
                          </>
                        )}
                        {transaction.status === 'success' && (
                          <>
                            <img src="/images/actions/success.svg" alt="icon-success" className="img-action" />
                          </>
                        )}
                        {transaction.status === 'cancel' && (
                          <>
                            <img src="/images/actions/cancel.svg" alt="icon-cancel" className="img-action" />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                });
                return <>{dataTransaction}</>;
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default IncomeTransaction;

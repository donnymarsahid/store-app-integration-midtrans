import React, { useState } from 'react';
import './css/style.css';
import { API, getTransactions } from '../../config/api';
import { useMutation, useQuery } from 'react-query';
import { convert } from 'rupiah-format';
import swal from 'sweetalert';
import loading from '../../assets/img/loading.gif';

const IncomeTransaction = () => {
  const { data: transactions, refetch, isLoading } = useQuery('getTransactionsCache', getTransactions);
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
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await API().put('/transaction/' + id, config);
          refetch();
          swal('Transaction success approve!', {
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

  if (isLoading) {
    return (
      <div className="custom-status">
        <img src={loading} alt="load" width="100px" />
      </div>
    );
  }

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
              {transactions?.map((data, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.address}</td>
                    <td>{data.posCode}</td>
                    <td className="column-price">{convert(data.total)}</td>
                    <td className={`income ${data.status}`}>{data.status}</td>
                    <td className="text-center">
                      {data.status === 'waiting approve' && (
                        <>
                          <button
                            className="me-2 btn-cancel"
                            onClick={() => {
                              handlerCancel.mutate(data.id);
                            }}
                          >
                            cancel
                          </button>
                          <button
                            className="btn-approve"
                            onClick={() => {
                              handlerOnTheWay.mutate(data.id);
                            }}
                          >
                            approve
                          </button>
                        </>
                      )}
                      {data.status === 'on the way' && (
                        <>
                          <img src="/images/actions/success.svg" alt="icon-success" className="img-action" />
                        </>
                      )}
                      {data.status === 'success' && (
                        <>
                          <img src="/images/actions/success.svg" alt="icon-success" className="img-action" />
                        </>
                      )}
                      {data.status === 'cancel' && (
                        <>
                          <img src="/images/actions/cancel.svg" alt="icon-cancel" className="img-action" />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default IncomeTransaction;

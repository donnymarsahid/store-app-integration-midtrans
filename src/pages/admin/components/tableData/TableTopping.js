import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import convertRupiah from 'rupiah-format';
import { API, getToppings } from '../../../../config/api';
import { Modal, Button } from 'react-bootstrap';

const TableTopping = () => {
  const { data: toppings, isLoading: loadingTopping, refetch } = useQuery('toppingsCache', getToppings);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerDelete = (id) => {
    handleShow();
    setIdDelete(id);
  };

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
        },
      };
      const response = await API().delete('/topping/' + id, config);
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  const actionDelete = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <title>WaysBucks | Topping</title>
      <section className="income-transaction">
        <div class="container">
          <div class="title d-flex justify-content-between align-items-center">
            <h1 className="mb-3">Topping</h1>
            <Link to="/admin/topping/add-topping" className="text-decoration-none">
              <button class="added d-flex align-items-center">add topping</button>
            </Link>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {toppings?.map((topping, index) => {
                return (
                  <tr>
                    <td scope="col">{index + 1}</td>
                    <td scope="col" className="d-flex justify-content-center">
                      <img src={topping.image} alt={topping.image} />
                    </td>
                    <td scope="col">{topping.title}</td>
                    <td scope="col">{convertRupiah.convert(topping.price)}</td>
                    <td scope="col" className="action">
                      <Link to={`/admin/update-topping/${topping.id}`}>
                        <button className="me-2">Edit</button>
                      </Link>
                      <button
                        className="trash"
                        onClick={() => {
                          handlerDelete(topping.id);
                        }}
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <Modal show={show} onHide={handleClose} centered className="text-center modal-delete">
        <Modal.Body>
          <h3>Are You Sure Delete?</h3>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose} className="btn-closed">
            cancel
          </Button>
          <Button variant="primary" onClick={actionDelete} className="btn-delete">
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableTopping;

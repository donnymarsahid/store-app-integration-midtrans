import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import convertRupiah from 'rupiah-format';
import { API, getProducts } from '../../../../config/api';
import { Modal, Button } from 'react-bootstrap';

const TableProduct = () => {
  const { data: products, isLoading: loadingTopping, refetch } = useQuery('productsCache', getProducts);
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
      const response = await API().delete('/product/' + id, config);
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
      <section className="income-transaction">
        <div class="container">
          <div class="title d-flex justify-content-between align-items-center">
            <h1 className="mb-3">Product</h1>
            <Link to="/admin/product/add-product" className="text-decoration-none">
              <button class="added d-flex align-items-center">add product</button>
            </Link>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">TypeCoffee</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => {
                return (
                  <tr>
                    <td scope="col">{index + 1}</td>
                    <td scope="col" className="d-flex justify-content-center">
                      <img src={product.image} alt={product.image} />
                    </td>
                    <td scope="col">{product.title}</td>
                    <td scope="col">{product.typeCoffee}</td>
                    <td scope="col">{convertRupiah.convert(product.price)}</td>
                    <td scope="col">{product.status}</td>
                    <td scope="col" className="action">
                      <Link to={`/admin/update-product/${product.id}`}>
                        <button className="me-2">Edit</button>
                      </Link>
                      <button
                        className="trash"
                        onClick={() => {
                          handlerDelete(product.id);
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
            close
          </Button>
          <Button variant="primary" onClick={actionDelete} className="btn-delete">
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableProduct;

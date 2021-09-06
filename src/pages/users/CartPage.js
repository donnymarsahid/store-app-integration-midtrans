import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API, getCarts } from '../../config/api';
import convertRupiah from 'rupiah-format';
import { Modal, Button } from 'react-bootstrap';

const CartPage = () => {
  const { data: carts, refetch } = useQuery('getCartsCache', getCarts);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    price: 0,
    phone: '',
    posCode: '',
    address: '',
    attachment: '',
  });

  const handlerInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(form);
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };
      const response = await API().post('/transaction', config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerDelete = (id) => {
    handleShow();
    setIdDelete(id);
    console.log(id);
  };

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
        },
      };
      const response = await API().delete('/cart/' + id, config);
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

  const array = [];

  const cartsProducts = carts?.map((data) => {
    const dataPrice = [];

    dataPrice.push(data.product.price);

    const dataTopping = data.product.toppings.map((topping) => {
      dataPrice.push(topping.price);
      return <>{topping.title},</>;
    });

    const resultPrice = dataPrice.reduce((acc, curr) => acc + curr);

    array.push(resultPrice);

    return (
      <div className="list-cart mb-3 d-flex align-items-center justify-content-between">
        <div className="image-description d-flex align-items-center">
          <img src={data.product.image} alt="product" className="me-3" />
          <div className="description">
            <p className="text-capitalize">{data.product.title}</p>
            <div class="topping d-flex flex-row">
              <p>Topping: {dataTopping}</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="price-remove text-end">
          <p>{convertRupiah.convert(resultPrice)}</p>
          <i
            className="fas fa-trash"
            onClick={() => {
              handlerDelete(data.id);
            }}
          ></i>
        </div>
      </div>
    );
  });

  const totalPriceAll = array.reduce((acc, curr) => acc + curr);

  const [fileUpload, setFileUpload] = useState('/images/upload-file.svg');

  const handlerFile = (e) => {
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setFileUpload(url);
    }
  };
  return (
    <>
      <title>WaysBucks | Cart</title>
      <section className="cart-page">
        <div className="container">
          <form onSubmit={handlerSubmit}>
            <div className="row">
              <div className="title">
                <h1>My Cart</h1>
                <h5>Review Your Order</h5>
              </div>
              <div className="col-md-7">
                <div className="parent-list">{cartsProducts}</div>
                <div class="row">
                  <div class="col-md-8">
                    <div className="sub-total d-flex justify-content-between">
                      <div className="detail mt-3">
                        <p>Subtotal</p>
                        <p>Quantity</p>
                      </div>
                      <div className="detail-2 mt-3 text-end">
                        <p>{convertRupiah.convert(totalPriceAll)}</p>
                        <p>{carts?.length}</p>
                      </div>
                    </div>
                    <div className="total d-flex justify-content-between">
                      <p>Total</p>
                      <p>{convertRupiah.convert(totalPriceAll)}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <input type="file" name="image" id="upload" className="d-none" required onChange={handlerFile} />
                    <label for="upload" className="upload-struck d-flex flex-column align-items-center justify-content-center">
                      <img src={fileUpload} alt="uploadFile" width="70px" />
                      <p>Attache Of Transaction</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-5 d-flex flex-column">
                <input type="text" name="name" id="name" placeHolder="Name" className="mb-4" required onChange={handlerInput} />
                <input type="email" name="email" id="email" placeHolder="Email" className="mb-4" required onChange={handlerInput} />
                <input type="number" name="phone" id="phone" placeHolder="Phone" className="mb-4" required onChange={handlerInput} />
                <input type="number" name="posCode" id="postcode" placeHolder="Pos Code" className="mb-4" required onChange={handlerInput} />
                <textarea name="address" id="address" cols="30" rows="10" placeHolder="Address" onChange={handlerInput}></textarea>
                <button type="submit" className="btn-pay">
                  Pay
                </button>
              </div>
            </div>
          </form>
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

export default CartPage;

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API, getCarts } from '../../config/api';
import convertRupiah from 'rupiah-format';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const history = useHistory();

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const [showOrder, setShowOrder] = useState(false);
  const handleCloseOrder = () => {
    history.push('/profile');
    window.location.reload();
  };
  const handleShowOrder = () => setShowOrder(true);

  const { data: carts, refetch } = useQuery('getCartsCache', getCarts);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    posCode: '',
    address: '',
    image: '',
  });

  const { name, email, phone, posCode, address, image } = form;

  const handlerInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dataId = [];

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
  const [fileUpload, setFileUpload] = useState('/images/upload-file.svg');

  const array = [];

  if (carts?.length === 0) {
    return (
      <>
        <title>WaysBucks | Cart</title>
        <section className="cart-page-null d-flex align-items-center justify-content-center flex-column">
          <img src="/images/empty-cart.png" alt="empty-cart" width="530px" />
          <Link to="/all-menu">
            <button class="btn-empty">Order Now</button>
          </Link>
        </section>
      </>
    );
  }

  const cartsProducts = carts?.map((data) => {
    const dataPrice = [];

    dataId.push(data.id);
    dataPrice.push(data.product.price);

    const dataTopping = data.toppings.map((topping) => {
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
              <p>{data.toppings.length === 0 ? <>Topping not found</> : <>Topping: {dataTopping}</>}</p>
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

  const handlerFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setFileUpload(url);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (fileUpload === '/images/upload-file.svg') {
        setMessage('select your attachment');
        setTimeout(() => {
          setMessage('');
        }, 3000);
        return false;
      }
      const formData = new FormData();
      formData.set('name', name);
      formData.set('email', email);
      formData.set('phone', phone);
      formData.set('posCode', posCode);
      formData.set('address', address);
      formData.set('total', totalPriceAll);
      formData.set('image', image);

      const config = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
        },
        body: formData,
      };

      const response = await API().post('/transaction', config);

      console.log(response);

      if (response.status === 'success') {
        handleShowOrder();
      }
    } catch (error) {
      console.log(error);
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
                    <input type="file" name="image" id="upload" className="d-none" onChange={handlerFile} />
                    <label for="upload" className="upload-struck d-flex flex-column align-items-center justify-content-center">
                      <img src={fileUpload} alt="uploadFile" width="70px" />
                      <p>Attache Of Transaction</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-5 d-flex flex-column">
                {message && (
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                )}
                <input type="text" name="name" id="name" placeHolder="Name" className="mb-4" required onChange={handlerInput} autoComplete="off" />
                <input type="email" name="email" id="email" placeHolder="Email" className="mb-4" required onChange={handlerInput} autoComplete="off" />
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
          <h5>Are You Sure Delete Cart?</h5>
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

      <Modal show={showOrder} centered onHide={handleCloseOrder}>
        <Modal.Body>Thank you for ordering in us, please wait verify you order</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="btn-order" onClick={handleCloseOrder}>
            oke
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartPage;

import React, { useState } from 'react';
import logo from '../../assets/img/logo-waysbucks.svg';
import barcode from '../../assets/img/barcode.svg';
import { useMutation, useQuery } from 'react-query';
import { API, getTransactionUser, getUser } from '../../config/api';
import moment from 'moment';
import { convert } from 'rupiah-format';
import { Modal, Button } from 'react-bootstrap';
import clip from '../../assets/img/clip.svg';
import { useHistory } from 'react-router';
import swal from 'sweetalert';

const Profile = () => {
  const history = useHistory();
  const { data: transactionsUser, refetch } = useQuery('transactionsUserCache', getTransactionUser);
  const { data: userId } = useQuery('getUserIdCache', getUser);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    fullname: '',
    image: '',
  });

  const { fullname, image } = form;

  const [namePath, setNamePath] = useState('upload image');

  const handlerInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlerFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
    const path = e.target.value;
    const format = path.replace(/^.*\\/, '');
    setNamePath(format);
  };

  const handlerSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log(form);

      const formData = new FormData();
      formData.set('image', image);
      formData.set('fullname', fullname);

      const config = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
        },
        body: formData,
      };

      const response = await API().put('/user', config);

      if (response.status === 'success') {
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handlerSuccess = useMutation(async (id) => {
    try {
      const body = JSON.stringify({ status: 'success' });
      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.token,
        },
        body,
      };

      swal({
        title: 'Have you received the coffee?',
        icon: 'success',
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await API().put('/transaction/' + id, config);
          refetch();
          swal('Enjoy the coffee', {
            icon: 'success',
          });
        } else {
          swal('Happy waiting for coffee to come');
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <title>WaysBucks | Profile</title>
      <section className="profile mb-5">
        <div class="container">
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="title-image">
                <h3 className="mb-3">My Profile</h3>
                <div class="detail d-flex ">
                  <div class="profile-image d-flex flex-column">
                    <input type="file" name="image" id="upload" className="d-none" />
                    <label for="upload">
                      <img src={userId?.image} alt="profile" className="profile" />
                    </label>
                    <button className="btn-change-profile mt-3" onClick={handleShow}>
                      <i class="fas fa-cog pe-1"></i>setting profile
                    </button>
                  </div>
                  <div class="text ps-4">
                    <p>Full Name : {userId?.fullname}</p>
                    <p>Email : {userId?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 transaction">
              <h3>My Transaction</h3>
              {transactionsUser?.length === 0 && (
                <>
                  <div class="box-empty-transaction-profile">
                    <p>empty transaction</p>
                  </div>
                </>
              )}
              {transactionsUser?.map((data) => {
                const dataOrders = data.orders.map((item) => {
                  const dataToppings = item.toppings.map((topping) => <p>{topping.title},</p>);
                  return (
                    <div class="list d-flex mb-3">
                      <img src={item.product.image} alt={item.product.image} className="coffee" />
                      <div class="detail-transaction ps-3">
                        <h6>{item.product.title}</h6>
                        <p>{moment(item.createdAt).format('LL')}</p>
                        <div class="topping d-flex">
                          <p>Topping : </p>
                          {dataToppings}
                        </div>
                        <p>{convert(item.subTotal)}</p>
                      </div>
                    </div>
                  );
                });
                return (
                  <div class="box-transaction mb-5">
                    <div class="row">
                      <div class="col-md-9">{dataOrders}</div>
                      <div class="col-md-3 d-flex flex-column justify-content-center align-items-center">
                        <img src={logo} alt="logo" className="logo" />
                        <img src={barcode} alt="barcode" className="barcode mt-3 mb-3" />
                        {data.status === 'on the way' ? (
                          <>
                            <button class={`btn-profile ${data.status}`} onClick={() => handlerSuccess.mutate(data.id)}>
                              {data.status}
                            </button>
                          </>
                        ) : (
                          <>
                            <button class={`btn-profile ${data.status}`}>{data.status}</button>
                          </>
                        )}
                        <p className="text-total pt-1">Sub Total :</p>
                        <p className="text-total">{convert(data.total)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} className="modal-profile">
        <Modal.Header>
          <Modal.Title className="update-profile">
            <i class="fas fa-cog pe-1"></i>Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column form-profile">
            <label for="fullname" className="text-profile">
              Fullname
            </label>
            <input type="text" name="fullname" id="fullname" Value={userId?.fullname} onChange={handlerInput} required />
            <input type="file" name="image" id="image" className="d-none" onChange={handlerFile} required />
            <p className="m-0 mt-2 text-profile">Image</p>
            <label for="image" className="input-profile d-flex justify-content-between mb-3">
              <p className="m-0">{namePath}</p>
              <img src={clip} alt="clip" width="15px" />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" className="btn-danger-profile" onClick={(e) => handlerSubmit.mutate(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;

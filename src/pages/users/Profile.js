import React from 'react';
import logo from '../../assets/img/logo-waysbucks.svg';
import barcode from '../../assets/img/barcode.svg';
import { useQuery } from 'react-query';
import { getTransactionUser, getUser } from '../../config/api';
import moment from 'moment';
import { convert } from 'rupiah-format';

const Profile = () => {
  const { data: transactionsUser } = useQuery('transactionsUserCache', getTransactionUser);
  const { data: userId } = useQuery('userIdCache', getUser);

  return (
    <>
      <title>WaysBucks | Profile</title>
      <section className="profile">
        <div class="container">
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="title-image">
                <h3 className="mb-3">My Profile</h3>
                <div class="detail d-flex ">
                  <div class="profile-image">
                    <form onSubmit="">
                      <input type="file" name="image" id="upload" className="d-none" />
                      <label for="upload">
                        <img src="" alt="profile" className="profile" />
                      </label>
                    </form>
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
                        <p>15.000</p>
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
                        <button class="btn-action">waiting approve</button>
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
    </>
  );
};

export default Profile;

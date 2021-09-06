import React from 'react';
import logo from '../../assets/img/logo-waysbucks.svg';
import barcode from '../../assets/img/barcode.svg';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';
import { useState } from 'react/cjs/react.development';

const Profile = () => {
  const { data: user } = useQuery('getUserCache', async () => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
    };
    const response = await API().get('/user', config);
    return response.data.userDetail;
  });

  // const { data: userTransaction } = useQuery('userTransaction', async () => {
  //   try {
  //     const config = {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.token,
  //       },
  //     };

  //     const response = await API().get('/transaction/' + user?.id, config);
  //     return response.userTransaction;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  const [fileUpload, setFileUpload] = useState(user?.image);
  const [image, setImage] = useState('');

  const handlerInput = (e) => {
    setImage({ [e.target.name]: e.target.files[0] });
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setFileUpload(url);
    }
  };

  const handlerSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set('image', image);

      const config = {
        method: 'PUT',
        headers: {
          // 'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.token,
        },
        body: formData,
      };

      const response = await API().put('/user/' + user?.id, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

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
                    <form onSubmit={(e) => handlerSubmit.mutate(e)}>
                      <input type="file" name="image" id="upload" className="d-none" onChange={handlerInput} />
                      <label for="upload">
                        <img src={fileUpload} alt="profile" className="profile" />
                      </label>
                      {/* <button type="submit">change profile</button> */}
                    </form>
                  </div>
                  <div class="text ps-4">
                    <p>Full Name : {user?.fullname}</p>
                    <p>Email : {user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 transaction">
              <h3>My Transaction</h3>
              <div class="box-transaction">
                <div class="row">
                  <div class="col-md-8"></div>
                  <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} alt="logo" className="logo" />
                    <img src={barcode} alt="barcode" className="barcode mt-3 mb-3" />
                    <p>Sub Total : </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

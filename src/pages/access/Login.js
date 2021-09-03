import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';
import './css/style.css';

const Login = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

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
      const response = await API().post('/login', config);

      console.log(response);

      if (response.status === 'success') {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.user,
        });
        if (response.data.user.status === 'admin') {
          history.push('/admin');
        }
      }
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal login" id="exampleModalLogin">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <span></span>
              <i className="fas fa-times" data-bs-dismiss="modal"></i>
            </div>
            <div className="modal-body">
              <div className="access-login-register d-flex justify-content-center align-items-center">
                <div className="box-access">
                  <h2>Login</h2>
                  <form onSubmit={handlerSubmit}>
                    <input type="email" name="email" id="email" placeHolder="Email" className="mt-3 mb-3" autoComplete="off" required onChange={handlerInput} />
                    <br />
                    <input type="password" name="password" id="password" placeHolder="Password" className="mb-4" autoComplete="off" required onChange={handlerInput} />
                    <br />
                    <button type="submit">Login</button>
                  </form>
                  <p className="text-center mt-3 d-flex justify-content-center">
                    Don't have an account ? click
                    <p className="ps-1 click m-0 text-decoration-underline" data-bs-toggle="modal" data-bs-target="#exampleModalRegister" style={{ cursor: 'pointer' }}>
                      here
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

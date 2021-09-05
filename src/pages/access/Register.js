import React, { useState } from 'react';
import { API } from '../../config/api';
import { useHistory } from 'react-router';
import './css/style.css';

const Register = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { fullname, email, password, confirmPassword } = form;

  const handlerInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setMessage('password does not match');
        setTimeout(() => {
          setMessage('');
        }, 3000);
        return false;
      }
      const body = JSON.stringify({ fullname, email, password });
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };
      const response = await API().post('/register', config);
      if (response.status === 'failed') {
        setMessage(response.message);
        setTimeout(() => {
          setMessage('');
        }, 3000);
        return false;
      }
      setMessage('success register please login');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal register" tabindex="-1" id="exampleModalRegister">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <span></span>
              <i className="fas fa-times" data-bs-dismiss="modal"></i>
            </div>
            <div className="modal-body register">
              <div className="access-login-register d-flex justify-content-center align-items-center">
                <div className="box-access">
                  <h2>Register</h2>
                  {message && (
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <input type="text" name="fullname" id="fullname" placeHolder="Full Name" className="mt-3 mb-3" onChange={handlerInput} autoComplete="off" required />
                    <br />
                    <input type="email" name="email" id="email" placeHolder="Email" className="mt-3 mb-3" onChange={handlerInput} autoComplete="off" required />
                    <br />
                    <input type="password" name="password" id="password" placeHolder="Password" className="mb-4" onChange={handlerInput} autoComplete="off" required />
                    <br />
                    <input type="password" name="confirmPassword" id="confrim-password" placeHolder="Confirm Password" className="mb-4" onChange={handlerInput} autoComplete="off" required />
                    <br />
                    <button type="submit">Register</button>
                  </form>
                  <p className="text-center mt-3 d-flex justify-content-center">
                    Already have an account ? click
                    <p className="ps-1 click m-0 text-decoration-underline" data-bs-dismiss="modal" style={{ cursor: 'pointer' }}>
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

export default Register;

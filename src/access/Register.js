import React, { useState } from 'react';
import './css/style.css';
import dataAccount from '../data/account.json';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [status, setStatus] = useState('');
  const dataAccountAuth = JSON.parse(localStorage.getItem('user_auth'));

  const handlerRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('password does not match');
      setTimeout(() => {
        setStatus('');
      }, 4000);
      return false;
    } else {
      const findAccount = dataAccountAuth.find((data) => data.email === email);
      if (findAccount) {
        setStatus('email has been use');
        setTimeout(() => {
          setStatus('');
        }, 4000);
        return false;
      }
      dataAccount.push({
        id: uuidv4(),
        fullname: fullname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      localStorage.setItem('user_auth', JSON.stringify(dataAccount));
      setStatus(
        <>
          success register please
          <span className="fw-bold text-decoration-underline" data-bs-dismiss="modal">
            Login
          </span>
        </>
      );
      setTimeout(() => {
        setStatus('');
      }, 4000);
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
                  {status && (
                    <div className="alert alert-success" role="alert">
                      {status}
                    </div>
                  )}
                  <form onSubmit={handlerRegister}>
                    <input
                      type="text"
                      id="fullname"
                      placeHolder="Full Name"
                      className="mt-3 mb-3"
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
                    <br />
                    <input
                      type="email"
                      id="email"
                      placeHolder="Email"
                      className="mt-3 mb-3"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
                    <br />
                    <input
                      type="password"
                      id="password"
                      placeHolder="Password"
                      className="mb-4"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
                    <br />
                    <input
                      type="password"
                      id="confrim-password"
                      placeHolder="Confirm Password"
                      className="mb-4"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
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

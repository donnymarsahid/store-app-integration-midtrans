import React, { useState } from 'react';
import './css/style.css';

const Register = () => {
  const [newAccount, setNewAccount] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { fullname, email, password, confirmPassword } = newAccount;

  const [status, setStatus] = useState('');
  const dataAccountAuth = JSON.parse(localStorage.getItem('user_auth'));

  const handlerInput = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

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
      setStatus('success register please login');
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
                    <div className="alert alert-danger" role="alert">
                      {status}
                    </div>
                  )}
                  <form onSubmit={handlerRegister}>
                    <input type="text" name="fullname" id="fullname" placeHolder="Full Name" className="mt-3 mb-3" onChange={(e) => handlerInput(e)} autoComplete="off" required />
                    <br />
                    <input type="email" name="email" id="email" placeHolder="Email" className="mt-3 mb-3" onChange={(e) => handlerInput(e)} autoComplete="off" required />
                    <br />
                    <input type="password" name="password" id="password" placeHolder="Password" className="mb-4" onChange={(e) => handlerInput(e)} autoComplete="off" required />
                    <br />
                    <input type="password" name="confirmPassword" id="confrim-password" placeHolder="Confirm Password" className="mb-4" onChange={(e) => handlerInput(e)} autoComplete="off" required />
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

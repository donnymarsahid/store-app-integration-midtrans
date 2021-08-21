import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './css/style.css';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const history = useHistory();

  const handlerLogin = (e) => {
    e.preventDefault();
    const dataAccountAuth = JSON.parse(localStorage.getItem('user_auth'));
    const findAccountAuth = dataAccountAuth.find((data) => data.email === email && data.password === password);

    if (findAccountAuth) {
      localStorage.setItem('login_auth', true);
      localStorage.setItem(
        'user_transaction',
        JSON.stringify({
          ...findAccountAuth,
          order: [],
        })
      );
      history.push('/');
      window.location.reload();
    } else {
      setStatus('email/password is wrong');
      setTimeout(() => {
        setStatus('');
      }, 4000);
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
                  {status && (
                    <div className="alert alert-success" role="alert">
                      {status}
                    </div>
                  )}
                  <form onSubmit={handlerLogin}>
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
                    <button>Login</button>
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

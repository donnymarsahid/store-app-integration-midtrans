import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
      <div class="access-login-register d-flex justify-content-center align-items-center">
        <div class="box-access">
          <h2>Login</h2>
          {status && (
            <div class="alert alert-success" role="alert">
              {status}
            </div>
          )}
          <form onSubmit={handlerLogin}>
            <input
              type="email"
              id="email"
              placeHolder="Email"
              class="mt-3 mb-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type="password"
              id="password"
              placeHolder="Password"
              class="mb-4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <button>Login</button>
          </form>
          <p class="text-center mt-3">
            Don't have an account ? click {''}
            <Link to="/register" class="click">
              here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

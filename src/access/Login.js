import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';

const Login = () => {
  return (
    <>
      <div class="access-login-register d-flex justify-content-center align-items-center">
        <div class="box-access">
          <h2>Login</h2>
          <form>
            <input type="email" id="email" placeHolder="Email" class="mt-3 mb-3" />
            <br />
            <input type="password" id="password" placeHolder="Password" class="mb-4" />
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

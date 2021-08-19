import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';

const Register = () => {
  return (
    <>
      <div class="access-login-register d-flex justify-content-center align-items-center">
        <div class="box-access">
          <h2>Register</h2>
          <form>
            <input type="text" id="fullname" placeHolder="Full Name" class="mt-3 mb-3" />
            <br />
            <input type="email" id="email" placeHolder="Email" class="mt-3 mb-3" />
            <br />
            <input type="password" id="password" placeHolder="Password" class="mb-4" />
            <br />
            <input type="password" id="confrim-password" placeHolder="Confirm Password" class="mb-4" />
            <br />
            <button type="submit">Register</button>
          </form>
          <p class="text-center mt-3">
            Already have an account ? click {''}
            <Link to="/login" class="click">
              here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

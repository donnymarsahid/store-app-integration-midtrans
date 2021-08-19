import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          Success Register Please <Link to="/login">Login</Link>
        </>
      );
      setTimeout(() => {
        setStatus('');
      }, 4000);
    }
  };

  return (
    <>
      <div class="access-login-register d-flex justify-content-center align-items-center">
        <div class="box-access">
          <h2>Register</h2>
          {status && (
            <div class="alert alert-success" role="alert">
              {status}
            </div>
          )}
          <form onSubmit={handlerRegister}>
            <input
              type="text"
              id="fullname"
              placeHolder="Full Name"
              class="mt-3 mb-3"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
            <br />
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
            <input
              type="password"
              id="confrim-password"
              placeHolder="Confirm Password"
              class="mb-4"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
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

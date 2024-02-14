import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../Redux/TokenSlice';

export default function Login() {

  const dispatch = useDispatch(); 

  const navigation = useNavigate(); //Navigation

  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({}); //Validation errors object
  const [apiError, setApiError] = useState(); //Api errors

  // Validation object
  const validation = {
    email: /^[A-Z]{1}[a-zA-Z0-9\.-_]+@[a-z]+\.(com|net|org)$/i,
    password: /[a-zA-Z0-9-_@#]{8,24}/,
  };

  function checkValidation() {
    const newErrors = {};
    if (!validation.email.test(email)) {
      newErrors.email = "Invalid email";
    }
    if (!validation.password.test(password)) {
      newErrors.password = "Invalid password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendData = {
    email: email,
    password: password,
  };

  function handleLogin(e) {
    e.preventDefault();
    if (checkValidation()) {
      setIsLoading(true);
      axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', sendData)
        .then((response) => {
          localStorage.setItem('userToken', response.data.token);
          dispatch(getUserData()); //Dispatch the saveToken action
          setIsLoading(false);
          navigation('/');
        })
        .catch((error) => {
          setApiError(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <form onSubmit={(e) => handleLogin(e)} className='h-80'>

      <div className="container mx-auto mt-10 xs:w-full md:w-2/4">

        <h1 className='text-3xl dark:text-white'>Login</h1>

        {/* Register */}
        <p className='block text-gray-900 text-sm mt-1 mb-2 dark:text-white'>Don't have an account?&nbsp;
          <Link to='/register' className='text-blue-800 underline'>Register </Link>
        </p>

        {/* Api errors */}
        <p className="text-red-500">{apiError}</p>

        <div>

          {/* Email */}
          <div className="mb-2">
            <label htmlFor="email" className='dark:text-white'>Email</label>
            <input
              id='email'
              type="email"
              placeholder='Email'
              required
              autoComplete={isRemember ? "on" : "off"}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-2 relative">
            <label htmlFor="password" className='dark:text-white'>Password</label>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              required
              placeholder='Password'
              autoComplete={isRemember ? "on" : "off"}
              onChange={(e) => setPassword(e.target.value)}
              className="input "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 mt-5 mr-2 text-sm cursor-pointer focus:outline-none"
            >
              {showPassword ?
                (<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>)
                :
                (<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>)
              }
            </button>

            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* Remember password */}
          <div className="mb-2 flex items-center">
            <input
              id='checkbox'
              type="checkbox"
              onChange={() => setIsRemember(!isRemember)}
              className="mr-1"
            />
            <label htmlFor="checkbox" className='dark:text-white text-sm'>Remember Password?</label>
          </div>

          {/* Submit */}
          {isLoading ?
            <button type="submit" disabled className="cursor-progress btn block">Submit</button>
            :
            <button type="submit" className="btn block">Submit</button>
          }

        </div>
      </div>
    </form>

  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserData } from '../../Redux/TokenSlice';

export default function Navbar() {

  //Redux Token
  const token = useSelector((state) => (state.token.token));
  const counter = useSelector((state) => (state.counter));
  const dispatch = useDispatch();

  const [isMenuOpen, setisMenuOpen] = useState(false); //Menu toggle

  //Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className="border-b shadow-md border-gray-300 bg-white dark:bg-gray-900 dark:shadow-md dark:border-gray-00">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between py-4 px-4">

        {/* Logo section */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GalaxyGoods</span>
        </Link>

        {/* Login, Logout, Theme mode, cart & Main menu */}
        <div className="flex md:order-2 md:space-x-0 rtl:space-x-reverse ">

          {token ?
            <div className='flex'>
              {/* Cart */}
              <Link to='cart' className='mr-6 xs:hidden md:block' >
                <div className="relative ">
                  <div className="bottom-5 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2.5 text-xs text-white">{counter}</p>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" strokeidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6 text-black dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
              </Link>
              {/* Logout */}
              <Link to='/'
                onClick={() => { dispatch(deleteUserData()) }}
                type="button"
                className='btn mr-2 xs:hidden md:block'>
                Logout
              </Link>
            </div>
            :
            // Login 
            <Link to='login'
              type="button"
              className='btn mr-2 xs:hidden md:block'>
              Login
            </Link>
          }

          {/* Theme button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='btnTheme dark:text-white dark:hover:bg-transparent'>
            {darkMode ?
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              :
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            }
          </button>

          {/* Menu button */}
          <button
            type="button"
            onClick={() => setisMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden dark:text-gray-400"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Links section*/}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            {token ?
              <div>
                <Link to='/'
                  onClick={() => { dispatch(deleteUserData()) }}
                  type="button"
                  className='btn mr-2 block md:hidden'>
                  Logout
                </Link>
                <li className='md:ml-0'>
                  <Link to="cart" className="block md:hidden md:m-1 py-2 px-3 md:p-0 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 transition duration-250 " aria-current="page">
                    Cart
                  </Link>
                </li>
              </div>
              :
              <Link to='login'
                type="button"
                className='btn mr-2 md:hidden'>
                Login
              </Link>}

            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 transition duration-250 " aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link to="about" className="block py-2 px-3 md:p-0 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-250 ">
                About
              </Link>
            </li>
            <li>
              <Link to="services" className="block py-2 px-3 md:p-0 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-250 ">
                Services
              </Link>
            </li>
            <li>
              <Link to="contact" className="block py-2 px-3 md:p-0 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-250 ">
                Contact
              </Link>
            </li>
          </ul>

        </div>

      </div>
    </nav>
  );
}

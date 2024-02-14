import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigation = useNavigate() //Navigation

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [errors, setErrors] = useState({}); //Validation Errors object
    const [apiError, setApiError] = useState(); //Api errors

    // Validation object
    const validation = {
        name: /^[A-Z]{1}[a-z\s]{4,24}$/,
        email: /^[A-Z]{1}[a-zA-Z0-9\.-_]+@[a-z]+\.(com|net|org)$/i,
        phone: /(010|011|012|015){1}[0-9]{8}/,
        password: /[a-zA-Z0-9-_@#]{8,24}/,
    };

    function checkValidation() {
        const newErrors = {};
        if (!validation.name.test(name)) {
            newErrors.name = "Invalid name";
        }
        if (!validation.email.test(email)) {
            newErrors.email = "Invalid email";
        }
        if (!validation.password.test(password)) {
            newErrors.password = "Invalid password";
        }
        if (rePassword !== password) {
            newErrors.rePassword = "Password didn't match";
        }
        if (!validation.phone.test(phone)) {
            newErrors.phone = "Invalid phone";
        };
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0; //Return true if there are no errors
    };

    //Data object
    const sendData = {
        email: email,
        name: name,
        password: password,
        rePassword: password,
        phone: phone
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (checkValidation()) {
            setIsLoading(false);
            axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', sendData)
                .then((response) => {
                    setIsLoading(true)
                    navigation('/login')
                })
                .catch((error) => {
                    setApiError(error.response.data.message)
                    setIsLoading(true)
                });
        };
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="sm:container m-auto xs:w-3/4 md:w-2/4 mt-10">

                <h1 className='text-3xl mb-3 dark:text-white'>Register</h1>

                {/* Api error */}
                <p className="text-red-500">{apiError}</p>

                <div className="">
                    {/* Username */}
                    <div className="mb-2">
                        {/* <label htmlFor="username">Name</label> */}
                        <input
                            type="username"
                            required
                            placeholder='Username'
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                            type="email"
                            required
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    {/* Number */}
                    <div className="mb-2">
                        {/* <label htmlFor="phone">Phone</label> */}
                        <input
                            type="text"
                            required
                            placeholder='Phone Number'
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                        />
                        {errors.number && <p className="text-red-500">{errors.number}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-2 relative">
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 mt-0 mr-2 text-sm cursor-pointer focus:outline-none"
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

                    {/* Repassword */}
                    <div className="mb-2 relative">
                        {/* <label htmlFor="rePassword">Confirm Password</label> */}
                        <input
                            type={showRePassword ? 'text' : 'password'}
                            required
                            placeholder='Confirm Password'
                            onChange={(e) => setRePassword(e.target.value)}
                            className="input"
                        />
                        <button
                            type="button"
                            onClick={() => setShowRePassword(!showRePassword)}
                            className="absolute inset-y-0 right-0 mt-0 mr-2 text-sm cursor-pointer focus:outline-none"
                        >
                            {showRePassword ?
                                (<svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>)
                                :
                                (<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>)
                            }
                        </button>
                        {errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
                    </div>

                    {/* Submit button */}
                    {isLoading ?
                        <button type="submit" className="btn block mt-3 mb-6">Submit</button>
                        :
                        <button type="submit" disabled className="cursor-progress btn block mt-3 mb-6">Submit</button>
                    }
                </div>

            </div>
        </form>
    );
}

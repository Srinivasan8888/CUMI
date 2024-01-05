import React, { useState } from 'react';
import xyma from "../imgaes/xyma.png";
import { useNavigate } from 'react-router-dom';
import cumi from '../imgaes/cumi_login.png'
import './style.css';
const Login = () => {

 const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cumi.xyma.live/backend/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log(data);
      if (data.user) {
        localStorage.setItem('token', data.user);
        alert('Login Successful');
        window.location.href = '/' 
      } else {
        alert('Error : Incorrect Email and Password');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };
  return (
    
    <div className="flex justify-end items-center h-screen bg-[#A3A3A3] bg-cover" style={{ backgroundImage: `url(${cumi})`}}>
    <div className="bg-[#636262] mr-40 rounded-t-md  p-6 md:p-10">
      <div className="flex justify-center">
        <img src={xyma} className="cursor-pointer w-full md:w-40 mt-2 ml-0 md:ml-25 duration-500" alt="Logo" />
      </div>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-white">
        Sign in to your account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-5 text-white bg-[#1AADC4] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm md:text-base px-5 py-2.5 md:py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign in
        </button>
      </form>
      {message && (
        <div className={`mt-6 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  </div>  );
};
export default Login;

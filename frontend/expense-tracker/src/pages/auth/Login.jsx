import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate()
  //handle login form submit

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please Enter a Valid Email")
      return
    }

    if(!password) {
      setError("Please Enter the Password")
      return
    }

    setError("")
    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const {token, user} = response.data;
      
      if(token){
      localStorage.setItem('token', token); // Store token in localStorage
      updateUser(user); // Update user context
      navigate('/home')
    }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
    }
  }
  
  return (
   <div className='flex flex-col gap-2 justify-center items-center h-[15%]'>
    <div>
      <h1 className='text-2xl font-extrabold text-primary'>Finance Manager</h1>
    </div>
    <div className='w-[70%] lg:w-[30%] border-2 border-gray-400 rounded-2xl p-3 text-center'>
        <h1 className='text-xl text-center text-primary '>Welcome Back</h1>
        <form onSubmit={handleLogin} action="">
        
          <Input 
            value = {email}
            onChange = {({target}) => setEmail(target.value)}
            label = "Email"
            placeholder = "Enter your email"
            type = "email"
          />
          
          <Input 
            value = {password}
            onChange = {({target}) => setPassword(target.value)}
            label = "Password"
            placeholder = "Enter your Password"
            type = "password"
          />

          {error && <p className='text-red-500 tex-xs pb-2.5'>{error}</p>}

          <button type="submit" className='btn-primary w-full'>Login</button>

          <p className=''>Dont Have an Account? {""}
          <Link className="font-medium text-primary" to="/signup">
           SignUp
          </Link>
          </p>
        </form>
      </div>
</div>
  )
}

export default Login

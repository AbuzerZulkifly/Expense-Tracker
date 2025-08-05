import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import AuthLayout from '../../components/layouts/authLayout.jsx'
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

  }
  
  return (
    <AuthLayout>
      <div className='w-[40%] pt-20'>
        <h1 className='text-xl text-center'>Welcome Back</h1>
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
          <Link className="" to="/signup">
           SignUp
          </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login

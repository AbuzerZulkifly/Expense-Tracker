import React from 'react'
import {
BrowserRouter as Router,
Route,
Routes,
Navigate
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Home from './pages/dashboard/Home.jsx'
import Expense from './pages/dashboard/Expense.jsx'
import Income from './pages/dashboard/Income.jsx'
import UserProvider from './contexts/UserContext.jsx'
import Admin from './pages/dashboard/Admin.jsx'
//import Admin from './pages/admin/Admin.jsx'

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup"  element={<Signup/>} />
          <Route path="/expense"  element={<Expense/>} />
          <Route path="/admin"  element={<Admin/>} />
          <Route path="/income" element={<Income/>} />
          <Route path="/home"  element={<Home />} />
          {/* <Route path="/admin"  element={<Admin />} /> */}
        </Routes>
      </Router>
    </div>
    <Toaster 
      toastOptions={{
        className: '',
        style: {
          border: '1px solid #713200',
          padding: '10px',
          fontSize: '13px',
          color: '#fff',
          backgroundColor: '#713200',
        },
      }}
    />
    </UserProvider>
  )
}
export default App

const Root = () => {
  //check if token exits in localStorage
  const isAuthenticated = localStorage.getItem('token') ? true : false

  // Redirect to dashboard if authenticated or to login
  return isAuthenticated ? (
    <Navigate to="/home" />
  ) :
  (
    <Navigate to="/login" />
  )

}
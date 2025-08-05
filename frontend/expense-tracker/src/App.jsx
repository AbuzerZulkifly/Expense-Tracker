import React from 'react'
import {
BrowserRouter as Router,
Route,
Routes,
Navigate
} from 'react-router-dom'

import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Home from './pages/dashboard/Home.jsx'
import Expense from './pages/dashboard/Expense.jsx'
import Income from './pages/dashboard/Income.jsx'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup"  element={<Signup/>} />
          <Route path="/expense"  element={<Expense/>} />
          <Route path="/income" element={<Income/>} />
          <Route path="/home"  element={<Home />} />
        </Routes>
      </Router>
    </div>
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
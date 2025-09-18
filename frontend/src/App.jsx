import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import OTP from './pages/OTP'
import PINCODE from './pages/PINCODE'
import CardBuilder from './pages/CARD'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/pin-code' element={<PINCODE />} />
        <Route path='/card' element={<CardBuilder />} />
      </Routes>
    </>
  )
}

export default App
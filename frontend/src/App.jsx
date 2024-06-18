import { useState } from 'react'

import HomePage from "./components/Home/HomePage.jsx";
import LoginPage from "./components/auth/Login/LoginPage.jsx";
import SignupPage from "./components/auth/Signup/SignupPage.jsx";

import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className='app flex max-w-6xl mx-auto'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App;

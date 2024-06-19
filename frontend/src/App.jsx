import { useState } from 'react'

import HomePage from "./components/Home/HomePage.jsx";
import LoginPage from "./components/auth/Login/LoginPage.jsx";
import SignupPage from "./components/auth/Signup/SignupPage.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from './components/common/RightPanel.jsx';
import NotificationPage from './components/notification/NotificationPage.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';

import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className='app flex max-w-6xl mx-auto'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App;

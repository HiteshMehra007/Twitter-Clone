import { useState } from 'react'

import HomePage from "./components/Home/HomePage.jsx";
import LoginPage from "./components/auth/Login/LoginPage.jsx";
import SignupPage from "./components/auth/Signup/SignupPage.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from './components/common/RightPanel.jsx';
import NotificationPage from './components/notification/NotificationPage.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import LoadingSpinner from './components/common/LoadingSpinner.jsx';

function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("https://social-media-thzy.onrender.com/api/v1/users/me");
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok) throw new Error(data.error || "Failed to Get User Data");
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  if(isLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  return (
    <div className='app flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to={"/login"} />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App;

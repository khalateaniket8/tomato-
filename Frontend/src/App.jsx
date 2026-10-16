import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import FoodPartnerLogin from './pages/FoodPartnerLogin'
import FoodPartnerRegister from './pages/FoodPartnerRegister'
import Home from './components/Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateFood from './components/CreateFood'
import FoodPartnerProfile from './components/FoodPartnerProfile'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/user/login' element={<UserLogin/>}/>
        <Route path='/user/register' element={<UserRegister/>}/>
        <Route path='/food-partner/login' element={<FoodPartnerLogin/>}/>
        <Route path='/food-partner/register' element={<FoodPartnerRegister/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-food' element={<CreateFood/>}/>
        <Route path='/food-partner/:id' element={<FoodPartnerProfile/>}/>
      </Routes>
    </div>
  )
}

export default App

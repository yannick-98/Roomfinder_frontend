import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/Public/Login'
import PublicLayout from '../components/Public/PublicLayout'
import Register from '../components/Public/Register'
import PrivateLayout from '../components/Private/PrivateLayout'
import Home from '../components/Private/Home'
import Profile from '../components/Private/Profile'
import Search from '../components/Private/Search'
import Room from '../components/Private/Room'
import MyAds from '../components/Private/MyAds'
import MyFavorites from '../components/Private/MyFavorites'
import Messages from '../components/Private/Messages'

const Router1 = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Navigate to='Login' />} />
                    <Route path='Login' element={<Login />} />
                    <Route path='Signup' element={<Register />} />
                </Route>
                <Route path="/User" element={<PrivateLayout />}>
                    <Route index element={<Navigate to='Home' />} />
                    <Route path='Home' element={<Home />} />
                    <Route path='Profile' element={<Profile />}>
                        <Route index element={<Navigate to='MyAds' />} />
                        <Route path='MyAds' element={<MyAds />} />
                        <Route path='MyFavorites' element={<MyFavorites />} />
                        <Route path='Messages' element={<Messages />} />
                    </Route>
                    <Route path='Search' element={<Search />} />
                    <Route path='Room/:id' element={<Room />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Router1

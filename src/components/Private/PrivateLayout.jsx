import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
    return (
        <div className='flex flex-col  w-full min-h-screen max-w-[1000px] mx-auto bg-gray-100'>
            <Header />
            <Outlet />
        </div>
    )
}

export default PrivateLayout

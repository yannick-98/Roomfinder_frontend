import React from 'react'
import { Outlet } from 'react-router-dom'
import roomfinder from '/src/assets/RoomFinder.png'

const PublicLayout = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen max-w-[1100px] mx-auto'>
            <img src={roomfinder} alt="" className='fixed top-0 w-80 mx-auto pt-10' />
            <Outlet />
        </div>
    )
}

export default PublicLayout

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import roomfinder from '/src/assets/RoomFinder.png'
import searchicon from '/src/assets/searchicon.png'
import usericon from '/src/assets/usericon.png'
import logouticon from '/src/assets/logouticon.png'
import houseicon from '/src/assets/houseicon.png'
import menuicon from '/src/assets/menuicon.png'

const Header = () => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    const logout = () => {
        localStorage.clear()
    }

    return (
        <div className='flex justify-between items-center w-full h-[7vh] p-3'>
            <div className='w-1/5 text-start'>
                <button onClick={handleShow} className='flex items-center justify-center sm:hidden'>
                    <img src={menuicon} alt="" className='w-6' />
                </button>
                <div className='hidden sm:flex gap-2 font-thin '>
                    <NavLink to={'/user/home'} className='flex justify-center items-center'>
                        <img src={houseicon} alt="" className='w-6' />
                        <i className='hidden lg:flex'>Home</i>
                    </NavLink>
                    <NavLink to={'/user/search'} className='flex justify-center items-center'>
                        <img src={searchicon} alt="" className='w-5' />
                        <i className='hidden lg:flex'>Search</i>
                    </NavLink>
                    <NavLink to={'/user/profile'} className='flex justify-center items-center'>
                        <img src={usericon} alt="" className='w-6' />
                        <i className='hidden lg:flex'>Profile</i>
                    </NavLink>
                </div>
            </div>
            {show && (
                <div onClick={handleShow} className='fixed top-0 left-0 w-full h-screen bg-gray-300 bg-opacity-70 flex justify-center items-center'>
                    <div className=' house2 fixed w-80 h-80 rounded-lg'>
                        <div className='flex flex-col justify-center items-center text-center h-full gap-7 font-bold text-3xl border-4 border-black bg-white bg-opacity-40'>
                            <NavLink onClick={handleShow} to='/User/Home' className=''><i className=''>Home</i></NavLink>
                            <NavLink onClick={handleShow} to='/User/Search' className=''><i>Search</i></NavLink>
                            <NavLink onClick={handleShow} to='/User/Profile' className=''><i>Profile</i></NavLink>
                        </div>
                        <div className='flex flex-col justify-center -m-5'>
                            <p className='font-serif text-center text-xs'>RoomFinder.com</p>
                        </div>
                    </div>
                </div>
            )
            }
            <NavLink to={'/user/home'} className="w-3/5">
                <img src={roomfinder} alt="" className='w-56 mx-auto' />
            </NavLink>
            <NavLink to={'/'} onClick={logout} className="w-1/5 flex justify-end font-thin">
                <img src={logouticon} alt="" className='w-6' />
            </NavLink>
        </div>
    )
}

export default Header

import React, { useEffect, useState } from 'react'
import userimg from '/src/assets/user.png'
import MyAds from './MyAds'
import MyFavorites from './MyFavorites'
import Messages from './Messages'
import { Global } from '../../helpers/Global'
import useForm from '../../hooks/useForm'
import { NavLink, Outlet } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    console.log(user)
    const token = localStorage.getItem('token')
    const { form, changed } = useForm({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [section, setSection] = useState('My ads')
    const [edit, setEdit] = useState(false)

    const auth = () => {
        const userLS = localStorage.getItem('user')
        const user = JSON.parse(userLS)
        setUser(user)
    }

    useEffect(() => {
        auth()
    }, [success])

    const showEdit = () => {
        setEdit(!edit)
    }

    const editSection = () => {
        const editProfile = async (e) => {
            e.preventDefault()
            try {
                const request = await fetch(`${Global.url}user/updateUser`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                    body: JSON.stringify({
                        username: form.username,
                        email: form.email,
                        phone: form.phone,
                        password: form.password,
                    })
                })
                const response = await request.json()
                if (response.status === 'success') {
                    setSuccess(true)
                    setTimeout(() => {
                        localStorage.setItem('user', JSON.stringify(response.user))
                        setSuccess(false)
                        setEdit(false)
                    }, 2000)

                } else {
                    setError(response.message)
                    setTimeout(() => {
                        setError('')
                    }, 3000)
                }
            } catch (error) {
                console.log(error)
                setError('Something went wrong')
                setTimeout(() => {
                    setError('')
                }, 3000)
            }
        }

        if (edit) {
            return (
                <form onSubmit={editProfile} className='w-full flex justify-center flex-col gap-2'>
                    <button type='button' onClick={showEdit} className='w-full text-end'>X</button>
                    <input type="text" name='username' placeholder='Username' onChange={changed} />
                    <input type="text" name='email' placeholder='Email' onChange={changed} />
                    <input type="text" name='phone' placeholder='Phone' onChange={changed} />
                    <input type="text" name='password' placeholder='Password' onChange={changed} />
                    <p className='font-thin'>Avatar</p>
                    <input name='file' id='file' type='file' onChange={changed} />
                    {error && <p className='text-red-500'>{error}</p>}
                    {success && <p className='text-green-500'>Profile updated</p>}
                    <button type='submit' className='bg-green-500 text-white rounded-md'>Save</button>
                </form>
            )
        } else {
            return (
                <div className='flex flex-col gap-1'>
                    <i className='font-bold text-xl'>
                        {user.username}
                        <button onClick={showEdit} className='text-xs font-thin px-2'>Edit</button>
                    </i>
                    <p>Email: <span>{user.email}</span></p>
                    <p>Phone: <span>{user.phone}</span></p>
                    <p>Ads: <span>0</span></p>
                </div>
            )
        }
    }

    const bgColor = (option) => {
        if (option === section) {
            return 'font-bold'
        }
    }

    return (
        <div className='h-[93vh] bg-gray-100'>
            <section>
                <div className='flex justify-center items-center w-full p-5 gap-10 '>
                    {!edit &&
                        <div className='flex flex-col justify-center items-center '>
                            <img src={userimg} alt="" className='w-32 rounded-full' />
                        </div>}
                    {editSection()}
                </div>
            </section>
            <section>
                <div className='flex w-full justify-around text-center p-1 border-2 text-sm sm:text-md bg-white'>
                    <NavLink to={'myAds'} className='w-1/3' onClick={() => setSection('My ads')}>
                        <i className={`fas fa-house ${bgColor('My ads')}`}>My ads</i>
                    </NavLink>
                    <NavLink to={'myFavorites'} className='w-1/3' onClick={() => setSection('My favorites')}>
                        <i className={`fas fa-heart ${bgColor('My favorites')}`}>My favorites</i>
                    </NavLink>
                    <NavLink to={'messages'} className='w-1/3' onClick={() => setSection('Messages')}>
                        <i className={`fas fa-trash ${bgColor('Messages')}`}>Messages</i>
                    </NavLink>
                </div>
            </section>
            <section className='overflow-y-scroll max-h-[70vh] bg-gray-100'>
                <div className='flex justify-center items-center w-full p-5 gap-10 '>
                    <Outlet />
                </div>
            </section>
        </div>
    )
}

export default Profile

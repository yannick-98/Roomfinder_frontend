import React, { useEffect } from 'react'
import { useState } from 'react'
import { Global } from '../../helpers/Global'
import Carrousel from './Carrousel'

const Room = () => {
    const id = window.location.pathname.split('/')[3]
    const token = localStorage.getItem('token')
    const [user, setUser] = useState({})
    const [post, setPost] = useState({})
    const [error, setError] = useState('')
    const userId = post.user


    useEffect(() => {
        getAd()
    }, [userId])

    const getAd = async () => {
        try {
            const request = await fetch(`${Global.url}post/getPost/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response = await request.json()
            setPost(response.post)
            const request2 = await fetch(`${Global.url}user/getUser/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response2 = await request2.json()
            console.log(response2)
            if (response2.status === 'error') {
                setError(response2.message)
                return
            }
            setUser(response2.user)
            console.log(response2.user)
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        }
    }

    return (
        <div>
            <Carrousel files={post.files} />
            <div className='w-full flex flex-col gap-4 p-4 '>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-2xl'>{post.title}</h1>
                    <p className='text-xl'>{post.date}</p>
                </div>
                <div className='flex justify-around items-center'>
                    <p className=''>{post.price}€</p>
                    <p className=''>{post.size}m</p>
                    <p className=''>{post.city}</p>
                </div>
                <p className='text-xl'>{post.description}</p>
                <p className='text-xl'><span className='text-sm'>Contact:</span> {user.username}</p>
                <div className='flex gap-5'>
                    {user.phone && <p>{user.phone} </p>}
                    {user.email && <p>{user.email} </p>}
                </div>
            </div>

        </div>
    )

}



export default Room

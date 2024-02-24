import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'

const Messages = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const [chats, setChats] = useState([])

    useEffect(() => {
        getChats()
    }, [chats])

    const getChats = async () => {
        try {
            const request = await fetch(`${Global.url}chat/getChats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response = await request.json()
            if (response.status === 'success') {
                setChats(response.chats)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-[90vw] max-w-[900px] flex flex-col gap-2'>
            {chats.length === 0 ? <p className='text-center text-xl font-bold text-slate-400'>You don't have any chats yet</p>
                : chats.map((chat) => {
                    return <Chat key={chat._id} chat={chat} />
                }
                )}
        </div>
    )
}

const Chat = ({ chat }) => {
    const users = chat.users
    const others = users.filter(user => user.user !== JSON.parse(localStorage.getItem('user')).id)
    const other = others[0]
    const deleteChat = async () => {
        try {
            const token = localStorage.getItem('token')
            const request = await fetch(`${Global.url}chat/deleteChat/${chat._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response = await request.json()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full mx-auto flex justify-between border-2 rounded-lg p-2 bg-white border-gray-300'>
            <div className='flex gap-3'>
                <p className='font-semibold'>{other.username}</p>
                <p>{chat.post.title}</p>
            </div>
            <div>
                <button onClick={deleteChat} className='px-1 text-white font-bold border rounded-lg bg-red-400'>Delete</button>
            </div>
        </div>
    )
}

export default Messages

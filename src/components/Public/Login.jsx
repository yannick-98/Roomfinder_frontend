import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useForm from '/src/hooks/useForm'
import { Global } from '../../helpers/Global'

const Login = () => {
    if (localStorage.getItem('token')) {
        window.location = '/User/Home'
    }
    const { form, changed } = useForm({})
    const [error, setError] = useState('')
    const [logged, setLogged] = useState(false)
    const Navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.Email || !form.Password) {
            setError('please fill all the fields')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }
        let data = {
            email: form.Email,
            password: form.Password
        }
        try {
            const request = await fetch(`${Global.url}user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const response = await request.json()
            console.log(response)
            if (response.status == 'success') {
                setLogged(true)
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
                setTimeout(() => {
                    Navigate('/User/Home')
                }, 1000);
            } else {
                setError(response.message)
                setTimeout(() => {
                    setError('')
                }, 3000);
            }
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }

    return (
        <>
            <p className='text-center text-xl font-extrabold pb-2'>Log In</p>
            <div className='flex flex-col ijustify-center w-80 border-2 rounded-lg py-9 px-3 bg-gray-50'>
                <br /><br />
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input type="email" placeholder='Email' name='Email' onChange={changed} className='w-full bg-gray-50 ' />
                    <input type="password" placeholder='Password' name='Password' onChange={changed} className='w-full bg-gray-50' />
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    {logged && <p className='text-green-500 text-sm'>Logged in successfully</p>}
                    <input type="submit" value="Login" className='w-full rounded bg-black text-white' />
                </form>
                <p className='text-sm pt-3'>Don't have an account? <NavLink to='/SignUp' className='text-blue-400'>Sign Up</NavLink> </p>
                <br /><br />
                <NavLink className="text-slate-600 uppercase text-center text-xs">Forget your password?</NavLink>
            </div>
        </>
    )
}

export default Login

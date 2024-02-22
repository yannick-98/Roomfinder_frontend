import React, { useEffect, useState } from 'react'
import { NavLink, Navigate, redirect } from 'react-router-dom'
import useForm from '/src/hooks/useForm'
import { Global } from '/src/helpers/Global'

const Register = () => {
    const { form, changed } = useForm({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.Username || !form.Email || !form.Password1 || !form.Password2) {
            setError('Please fill all the fields')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }
        if (form.Password1 !== form.Password2) {
            setError('Passwords do not match')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }
        if (form.Password1.length < 8) {
            setError('password must be at least 8 characters long')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }
        let data = {
            username: form.Username,
            email: form.Email,
            password: form.Password1
        }
        try {
            const request = await fetch(`${Global.url}user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            console.log(request)
            const response = await request.json()
            console.log(response)
            if (response.status === 'success') {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000);
            }
            if (response.status === 'error') {
                setError(response.message)
                setTimeout(() => {
                    setError('')
                }, 3000);
            }
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        }
    }

    return (
        <>
            <p className='text-center text-xl font-extrabold pb-2'>Sign Up</p>
            <div className='flex flex-col ijustify-center w-80 border-2 rounded-lg py-8 px-3 bg-gray-50'>
                <br />
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input type="text" placeholder='Username' name='Username' onChange={changed}
                        autoComplete='username' className='w-full bg-gray-50 ' />
                    <input type="email" placeholder='Email' name='Email' onChange={changed}
                        autoComplete='email' className='w-full bg-gray-50 ' />
                    <input type="password" placeholder='Password' name='Password1' onChange={changed}
                        autoComplete='password1' className='w-full bg-gray-50' />
                    <input type="password" placeholder='Confirm password' name='Password2'
                        autoComplete='password2' onChange={changed} className='w-full bg-gray-50' />
                    {error && <p className='text-red-500'>{error}</p>}
                    {success && <p className='text-green-500'>User created successfully</p>}
                    <input type="submit" value="Sign Up" className='w-full rounded bg-black text-white' />
                </form>
                <p className='text-sm pt-3'>Have an account? <NavLink to='/Login' className='text-blue-400'>Log In</NavLink> </p>
                <br />
            </div>
        </>
    )
}

export default Register

import React, { useState } from 'react'
import { Global } from '../../helpers/Global'
import useForm from '/src/hooks/useForm'

const CreateAd = ({ show }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const { form, changed } = useForm({})
    const [selected, setSelected] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // for (let i = 0; i < selected.length; i++) {
    //     const element = selected[i];
    //     console.log(element)
    // }

    const handleFiles = (e) => {
        e.preventDefault()
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            setSelected(prev => [...prev, files[i]])
        }
    }

    const handleCreateAd = async (e) => {
        e.preventDefault()
        try {
            if (!form.title || !form.description || !form.price || !form.city || !form.village) {
                setError('Please fill all the fields')
                setTimeout(() => {
                    setError('')
                }, 3000);
                return
            }
            const data = {
                title: form.title,
                description: form.description,
                price: form.price,
                size: form.size,
                city: form.city,
                village: form.village,
                address: form.address,
            }
            const request = await fetch(`${Global.url}post/createPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    userData: JSON.stringify(user),
                    postData: data
                })
            })
            const response = await request.json()
            console.log(response)
            if (selected.length > 0) {
                const formData = new FormData();
                for (let i = 0; i < selected.length; i++) {
                    formData.append('files', selected[i])
                }
                const requestImg = await fetch(`${Global.url}post/uploadImg/${response.post._id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                    },
                    body: formData
                })
                const responseImg = await requestImg.json()
                console.log(responseImg)
                if (responseImg.status === 'error') {
                    setError(response.message)
                    setTimeout(() => {
                        setError('')
                    }, 3000);
                }
                if (responseImg.status === 'success') {
                    console.log('succes img')
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                    }, 3000);
                }
            }
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }

    const handleRemoveImage = (index) => {
        setSelected((prev) => prev.filter((_, i) => i !== index));
    };

    return (

        <form onSubmit={handleCreateAd} encType='multipart/form-data' className='w-full'>
            <button onClick={show} className='w-full text-end font-bold text-slate-400'>X</button>
            <p className='text-xs font-thin pb-2'>Required *</p>
            <div className='flex flex-col gap-3'>
                <label htmlFor="">Title*</label>
                <input type="text" name='title' onChange={changed} className='rounded border' />
                <label htmlFor="">Description*</label>
                <textarea rows={5} name='description' onChange={changed} className='rounded border' />
                <div className='flex w-full justify-between'>
                    <div className='w-3/6'>
                        <label htmlFor="">Price*</label>
                        <input type="text" name='price' onChange={changed} className='rounded border w-full' />
                    </div>
                    <div className='w-2/5'>
                        <label htmlFor="">Size</label>
                        <input type="text" name='size' onChange={changed} className='rounded border w-full' />
                    </div>
                </div>
                <div className='flex w-full justify-between'>
                    <div className='flex flex-col w-2/5'>
                        <label htmlFor="">City*</label>
                        <input type="text" name='city' onChange={changed} className='rounded border' />
                    </div>
                    <div className='flex flex-col w-3/6'>
                        <label htmlFor="">Village*</label>
                        <input type="text" name='village' onChange={changed} className='rounded border' />
                    </div>
                </div>
                <label htmlFor="">Address</label>
                <input type="text" name='address' onChange={changed} className='rounded border' />
                <div className='flex gap-2'>
                    <input type="file" name='files' id='files' multiple onChange={handleFiles} />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>Ad created successfully</p>}
                {selected.length > 0 && <p className='text-green-500'>{selected.length} images selected</p>}
                <div className='flex gap-2 mt-2'>
                    {selected.map((file, index) => (
                        <div key={index} className='relative'>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Thumbnail ${index}`}
                                className='w-16 h-16 object-cover'
                            />
                            <button
                                type='button'
                                onClick={() => handleRemoveImage(index)}
                                className=' bg-red-500 text-white p-1 h-2 rounded-full'
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <button type='submit' className='w-full rounded bg-black text-white font-semibold'>Create</button>
            </div>
        </form>
    )
}

export default CreateAd
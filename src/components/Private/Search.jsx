import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Global } from '../../helpers/Global'

const Search = () => {
    const [ads, setAds] = useState([])
    const [filteredAds, setFilteredAds] = useState([])
    const [city, setCity] = useState('All')
    const [price, setPrice] = useState('All')
    const [size, setSize] = useState('All')
    const [error, setError] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
        getAds()
    }, [])

    useEffect(() => {
        filterAds()
    }, [city, price, size])

    const handleCity = (e) => {
        setCity(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    const handleSize = (e) => {
        setSize(e.target.value)
    }
    const clearSearch = () => {
        setCity('All')
        setPrice('All')
        setSize('All')
        document.getElementById('city').value = 'All'
        document.getElementById('price').value = 'All'
        document.getElementById('size').value = 'All'
    }

    const getAds = async () => {
        try {
            const request = await fetch(`${Global.url}post/feed`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response = await request.json()
            if (response.status === 'error') {
                setError(response.message)
                return
            }
            if (response.status === 'success') {
                const filtered = response.posts.filter(post => post.user !== JSON.parse(localStorage.getItem('user')).id)
                setAds(filtered)
                setFilteredAds(filtered)
            }
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        }
    }

    const filterAds = () => {

        const filterCity = ads.filter(ad => {
            if (city === 'All') {
                return ad
            } else {
                return ad.city === city
            }
        })
        const filterPrice = filterCity.filter(ad => {
            if (price === 'All') {
                return ad
            } else {
                return ad.price <= price
            }
        })
        const filterSize = filterPrice.filter(ad => {
            if (size === 'All') {
                return ad
            } else {
                return ad.size >= size
            }
        })
        setFilteredAds(filterSize)
    }

    return (
        <div>
            <form className='mb-5'>
                <div className='flex justify-around p-1 border-2 text-sm sm:text-md bg-white'>
                    <select name="city" onChange={handleCity} id="city">
                        <option value="All">All cities</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Sevilla">Sevilla</option>
                        <option value="Malaga">Malaga</option>
                        <option value="Alicante">Alicante</option>
                        <option value="Murcia">Murcia</option>
                        <option value="Castellon">Castellon</option>
                    </select>
                    <select name="price" onChange={handlePrice} id="price">
                        <option value="All">All prices</option>
                        <option value="100">100€</option>
                        <option value="200">200€</option>
                        <option value="300">300€</option>
                        <option value="400">400€</option>
                        <option value="500">500€</option>
                    </select>
                    <select name="size" onChange={handleSize} id="size">
                        <option value="All">All sizes</option>
                        <option value="10">+10m</option>
                        <option value="15">+15m</option>
                        <option value="20">+20m</option>
                    </select>
                </div>
            </form>

            <div className='w-full text-center'>
                <button onClick={clearSearch} className='border-2 rounded px-1'>Clear</button>
            </div>
            <section className='overflow-y-scroll w-full h-[80vh] py-5'>
                <div className='w-[90vw] max-w-[900px] mx-auto flex flex-col gap-5'>
                    {filteredAds.length > 0 ?
                        filteredAds.map((ad, index) => (
                            <Add key={index} id={ad._id} user={ad.userData} title={ad.title} description={ad.description}
                                price={ad.price} size={ad.size} city={ad.city} village={ad.village} address={ad.address}
                                phone={ad.phone} files={ad.files} />
                        ))
                        : <p className='text-center text-xl font-bold text-slate-400'>No rooms found </p>
                    }
                </div>
            </section>
        </div>
    )
}

const Add = ({ user, id, title, description, price, size, city, village, address, files }) => {
    const userD = JSON.parse(user)
    console.log(userD)
    const token = localStorage.getItem('token')

    const saveAd = async () => {
        const request = await fetch(`${Global.url}user/saveAd/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        })
        const response = await request.json()
        console.log(response)
    }

    const newChat = async () => {
        const request = await fetch(`${Global.url}chat/createChat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({
                userData: {
                    id: userD.id,
                    username: userD.username,
                    phone: userD.phone,
                    email: userD.email
                },
                post: {
                    id,
                    title,
                    description,
                    price,
                    size,
                    city,
                    village,
                    address,
                    files
                }
            })
        })
        const response = await request.json()
        console.log(response)
    }

    return (
        <div className='w-full mx-auto flex flex-col sm:flex-row border-2 rounded-lg bg-white border-gray-300'>
            <div>
                <Carrousel files={files} />
            </div>
            <div className='p-2 w-full flex flex-col gap-2 sm:max-h-96 sm:justify-between '>
                <NavLink target="_blank" to={`/user/room/${id}`} className='flex flex-col gap-3'>
                    <p className='font-bold text-xl'>
                        {title}
                    </p>
                    <div className='flex justify-around w-full'>
                        <p>{price}€</p>
                        <p>{size}m</p>
                        <p>{city}</p>
                        <p>4 people</p>
                    </div>
                    <p>{address}, {village}</p>
                    <p>{description}</p>
                </NavLink>
                <hr />
                <div className='flex justify-around '>
                    <button onClick={saveAd} className='border border-black rounded px-1 hover:scale-105'>Save</button>
                    <button onClick={newChat} className='border border-black rounded px-1 hover:scale-105'>Chat</button>
                    <p className='text-slate-600 '>{userD.username}: {userD.phone}</p>
                </div>
            </div>
        </div>
    )
}

const Carrousel = ({ files }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
    };
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
    };
    return (
        <div className="flex flex-col w-full sm:max-w-96 mx-auto">
            <div className=" w-full rounded-lg ">
                <img
                    src={`${Global.url}post/getImg/${files[currentIndex]}`}
                    alt="img"
                    className="rounded "
                    onClick={handleNext}
                />
            </div>
            <div className='w-full flex justify-between gap-5 text-xs rounded bg-black text-white'>
                <button onClick={handlePrev} className='px-2'>Prev</button>
                <button onClick={handleNext} className='px-2'>Next</button>
            </div>
        </div>
    )
}

export default Search

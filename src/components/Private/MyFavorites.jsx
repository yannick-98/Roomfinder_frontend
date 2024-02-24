import React, { useEffect, useState } from 'react'
import houseimg from '/src/assets/houseimg.png'
import { NavLink } from 'react-router-dom'
import { Global } from '../../helpers/Global'


const MyFavorites = () => {
    const [ads, setAds] = useState([])
    const [favorites, setFavorites] = useState([])
    const [filteredAds, setFilteredAds] = useState([])
    const token = localStorage.getItem('token')

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
                setAds(response.posts)
            }
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        }
    }


    const getFavorites = async () => {
        try {
            const request = await fetch(`${Global.url}user/getFavorites`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response = await request.json()
            if (response.status === 'success') {
                const fav = []
                response.posts.forEach((post) => {
                    fav.push(post._id)
                })
                setFavorites(fav)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const filterAds = () => {
        const filtered = ads.filter((ad) => {
            if (favorites.includes(ad._id)) {
                return ad
            }
        })
        setFilteredAds(filtered)
    }

    useEffect(() => {
        getAds()
    }, [favorites])

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        filterAds()
    }, [favorites])



    return (
        <div className='w-[90vw] max-w-[900px] flex flex-col gap-2'>
            {filteredAds.length ? (
                filteredAds.map((ad, index) => (
                    <Add key={index} ad={ad} getFavorites={getFavorites} />
                ))
            ) : (
                <p className='text-center text-xl font-bold text-slate-400'>You don't have any favorites yet</p>
            )}
        </div>
    )
}

const Add = ({ ad, getFavorites }) => {
    const unsaveAd = async () => {
        try {
            const token = localStorage.getItem('token')
            const request = await fetch(`${Global.url}user/unsaveAd/${ad._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const response = await request.json()
            console.log(response)
            if (response.status === 'error') {
                console.log(response.message)
                return
            }
            if (response.status === 'success') {
                console.log(response)
                getFavorites()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full mx-auto flex flex-col sm:flex-row border-2 rounded-lg bg-white border-gray-300'>
            <div>
                <Carrousel files={ad.files} />
            </div>
            <div className='p-2 w-full flex flex-col gap-2 sm:max-h-96 sm:justify-between '>
                <div className='flex flex-col gap-3'>
                    <p className='font-bold text-xl'>
                        {ad.title}
                    </p>
                    <div className='flex justify-around w-full'>
                        <p>365€</p>
                        <p>12m</p>
                        <p>Valencia</p>
                        <p>4 people</p>
                    </div>
                    <p>C/ Lauga Siega 28</p>
                    <p>Description: <span>description</span></p>
                </div>
                <div className='flex justify-around text-white font-bold'>
                    <NavLink target="_blank" to={`/User/Room/${ad._id}`} className='bg-blue-400 rounded-lg px-1'>View</NavLink>
                    <button onClick={unsaveAd} className='bg-red-400 rounded-lg px-1'>Delete</button>
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

export default MyFavorites

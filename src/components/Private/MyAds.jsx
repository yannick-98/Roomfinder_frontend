import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreateAd from './CreateAd';
import { Global } from '../../helpers/Global';
import getMyAds from '../api/GetMyAds';

const MyAds = () => {
    const [showCreateAd, setShowCreateAd] = useState(false);
    const ads = getMyAds();

    const show = () => {
        setShowCreateAd(!showCreateAd);
    };

    return (
        <div className='w-[90vw] max-w-[900px] flex flex-col gap-2'>
            <div className='w-full flex justify-center items-center p-3 bg-white rounded-lg'>
                {!showCreateAd ? (
                    <div className='w-full h-12 flex justify-center items-center rounded-lg border bg-white'>
                        <button onClick={show} className='font-bold text-slate-400'>
                            New Ad
                        </button>
                    </div>
                ) : (
                    <CreateAd show={show} getMyAds={getMyAds} />
                )}
            </div>
            {ads.length > 0 ? (
                ads.map((ad, index) => (
                    <Ad key={index} ad={ad} getMyAds={getMyAds} />
                ))
            ) : (
                <p className='text-center text-xl font-bold text-slate-400'>You don't have any ads yet</p>
            )}
        </div>
    );
};

const Ad = ({ ad }) => {
    const { _id: postId, title, description, price, size, city, village, address, files } = ad;
    const [error, setError] = useState('');
    const deleteAd = async () => {
        try {
            const token = localStorage.getItem('token');
            const request = await fetch(`${Global.url}post/deletePost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            const response = await request.json();
            if (response.status === 'error') {
                setError(response.message);
                return;
            }
            if (response.status === 'success') {
                console.log(response);
            } else {
                setError('Something went wrong');
                return
            }
        } catch (error) {
            setError('Error deleting ad');
            return
        }
    };

    return (
        <div className='w-full mx-auto flex flex-col sm:flex-row border-2 rounded-lg bg-white border-gray-300'>
            <div>
                <Carousel files={files} />
            </div>
            <div className='p-2 w-full flex flex-col gap-2 sm:max-h-96 sm:justify-between '>
                <div className='flex flex-col gap-3'>
                    <p className='font-bold text-lg'>{title}</p>
                    <div className='flex justify-around w-full'>
                        <p>{price}€</p>
                        <p>{size}m</p>
                        <p>{city}</p>
                        <p>4 people</p>
                    </div>
                    <p>
                        {address}, {village}
                    </p>
                    <p>
                        Description: <span>{description}</span>
                    </p>
                </div>
                <div className='flex justify-around text-white font-bold'>
                    <NavLink to={`/user/room/${postId}`} className='bg-blue-400 rounded-lg px-1 text-sm'>
                        View
                    </NavLink>
                    <button onClick={deleteAd} className='bg-red-400 rounded-lg px-1 text-sm'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const Carousel = ({ files }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
    };

    return (
        <div className='flex flex-col w-full sm:max-w-96 mx-auto'>
            <div className='w-full rounded-lg '>
                <img
                    src={`${Global.url}post/getImg/${files[currentIndex]}`}
                    alt='img'
                    className='rounded '
                    onClick={handleNext}
                />
            </div>
            <div className='w-full flex justify-between gap-5 text-xs rounded bg-black text-white'>
                <button onClick={handlePrev} className='px-2'>
                    Prev
                </button>
                <button onClick={handleNext} className='px-2'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyAds;

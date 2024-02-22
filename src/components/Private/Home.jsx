import React from 'react'
import { NavLink } from 'react-router-dom'
import '/src/images.css'
import HouseImg from '/src/assets/houseimg.png'

const Home = () => {

    return (
        <div>
            <section className='house w-full h-12'>
                <div className='flex justify-center items-end w-full h-full bg-white bg-opacity-30'>
                    <div className='mb-5 p-5 border rounded-lg bg-white bg-opacity-90'>
                        <section className='flex flex-col items-center gap-2'>
                            <p className='text-lg font-semibold'>Find a Room that Fits Your Lifestyle</p>
                            <div className='flex justify-between gap-1'>
                                <NavLink to='/user/search/'>
                                    <i className='fas fa-magnify-glass text-slate-600'>Discover</i>
                                </NavLink>
                            </div>
                        </section>
                    </div>
                </div >
            </section >

            <section className='p-5 space-y-4 pt-12'>
                <div className='flex flex-col sm:flex-row items-center gap-12'>
                    <div className='flex flex-col items-center gap-2'>
                        <img src={HouseImg} alt="" className='w-36 h-24 rounded-lg' />
                        <div className='flex flex-col items-center gap-2'>
                            <p className='font-bold'>The price of rental housing in Spain rises 5.2% in the second quarter of 2021</p>
                            <p>idealista / news</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <img src={HouseImg} alt="" className='w-36 h-24 rounded-lg' />
                        <div className='flex flex-col items-center gap-2'>
                            <p className='font-bold'>The price of rental housing in Spain rises 5.2% in the second quarter of 2021</p>
                            <p>idealista / news</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <img src={HouseImg} alt="" className='w-36 h-24 rounded-lg' />
                        <div className='flex flex-col items-center gap-2'>
                            <p className='font-bold'>The price of rental housing in Spain rises 5.2% in the second quarter of 2021</p>
                            <p>idealista / news</p>
                        </div>
                    </div>
                </div>
            </section>


        </div >
    )
}

export default Home

import React from 'react'
import { useState } from 'react'
import { Global } from '../../helpers/Global'


const Carrousel = ({ files }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
    };
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
    };
    try {
        return (
            <div className="flex flex-col w-full h-full bg-white">
                <div className=" w-full h-full rounded-lg sm:max-w-[60vw] lg:max-w-[40rem] mx-auto">
                    <img
                        src={`${Global.url}post/getImg/${files[currentIndex]}`}
                        alt="img"
                        className="rounded h-full w-full"
                        onClick={handleNext} />
                </div>

                <div className='w-full flex justify-between gap-5 text-xs p-0.5 rounded
                 bg-black text-white sm:max-w-[60vw] mx-auto'>
                    <button onClick={handlePrev} className='px-2'>Prev</button>
                    <button onClick={handleNext} className='px-2'>Next</button>
                </div>
            </div>
        )
    } catch (error) {
        console.log(error)
    }
}

export default Carrousel

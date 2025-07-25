import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setsearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setsearchedQuery(query));
    navigate('/browse');

  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get your <span className='text-[#6A38C2]'>Dream Job</span> </h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dicta hic odio molestiae delectus!</p>

        <div className='flex gap-4 w-[40%] mx-auto shadow-lg boarder boarder-gray-200 pl-3 rounded-full items-center'>
          <input type="text"
            placeholder='Find your dream jobs'
            className='outline-none border-none w-full'
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]' >
            <Search className='h-5 w-5 ' />
          </Button>
        </div>

      </div>

    </div>
  )
}

export default HeroSection

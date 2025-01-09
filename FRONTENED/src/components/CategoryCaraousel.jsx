import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "@/components/ui/button.jsx";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchedQuery } from '@/redux/jobSlice';



const category = [
  "Frontened Developer ",
  "Backend Developer",
  " Data Science ",
  "Graphic Designer",
  "FullStack Developer"
]

const CategoryCaraousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setsearchedQuery(query));
    navigate('/browse');

  }

  return (
    <div className=''>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                <Button onClick={() => searchJobHandler(cat)} variant='outline' className='font-medium rounded-full bg-gray-200'>{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

export default CategoryCaraousel

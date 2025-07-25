import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setsearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2, 3,];

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector(store => store.job)
  useEffect(() => {
    return () => {
      dispatch(setsearchedQuery(""));
    }
  })
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-15 '>
        <h1 className='font-bold'>Search Results : <span className='text-purple-700'>{allJobs.length}</span> </h1>
        <div className='grid grid-cols-3 gap-4 mt-3'>
          {
            allJobs.map((job, index) => <Job key={job._id} job={job} />)
          }

        </div>

      </div>
    </div>
  )
}

export default Browse

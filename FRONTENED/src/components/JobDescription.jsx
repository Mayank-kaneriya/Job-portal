import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  // useGetSingleJob(jobId) custom hook
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const { singleJob } = useSelector(store => store.job);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);

    }

  }


  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        console.log(res.data);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));

        }

      } catch (error) {
        console.log(error);

      }

    }
    fetchSingleJob();

  }, [jobId, dispatch, user?._id]);
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-500 font-bold '} variant={'ghost'}>{singleJob?.position}</Badge>
            <Badge className={'text-red-600 font-bold '} variant={'ghost'}>{singleJob?.jobType}</Badge>
            <Badge className={'text-purple-500 font-bold '} variant={'ghost'}>{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <div>
          <Button onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied} className={` bg-black  text-white hover:bg-black rounded-full mt-3 ${isApplied ? 'bg-gray-500' : ''} `} >{isApplied ? 'Already Applied' : 'Apply now'}</Button>
        </div>

      </div>
      <h1 className='border-b-2 border-gray-200 font-bold mt-5 p-2'>Job Description</h1>
      <div>
        <div className='my-5'>
          <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-700'> {singleJob?.title}</span> </h1>
          <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-700'>{singleJob?.location} </span> </h1>
          <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-700'>{singleJob?.description}</span> </h1>
          <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-700'>{singleJob?.experienceLevel}</span> </h1>
          <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-700'>{singleJob?.salary} LPA</span> </h1>
          <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-700'>{singleJob?.applications?.length}</span> </h1>
          <h1 className='font-bold my-1'>Application Date :<span className='pl-4 font-normal text-gray-700'>{singleJob?.createdAt.split("T")[0]}</span> </h1>
        </div>


      </div>


    </div>
  )
}

export default JobDescription

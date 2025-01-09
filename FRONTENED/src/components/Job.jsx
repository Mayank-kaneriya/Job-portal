import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = 'jnjiegeggerg';

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const difference = currentDate - createdAt;
    return Math.floor(difference / (1000 * 24 * 60 * 60));

  }
  return (
    <div className='rounded-md p-5 shadow-xl bg-white border border-gray-100' >
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-400'>{dayAgoFunction(job?.createdAt) === 0 ? "Today" : `${dayAgoFunction(job?.createdAt)} days ago`}</p>
        <Button className='rounded-full' size="icon"><Bookmark /></Button>
      </div>
      <div className='flex items-center my-2 gap-2'>
        <Button >
          <Avatar>
            <AvatarImage src={job?.company?.logo} className='h-10 w-10' />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-400'>{job?.location}</p>
        </div>

      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-gray-600 text-sm'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-500 font-bold '} variant={'ghost'}>{job?.position}</Badge>
        <Badge className={'text-red-600 font-bold '} variant={'ghost'}>{job?.jobType}</Badge>
        <Badge className={'text-purple-500 font-bold '} variant={'ghost'}>{job?.salary}</Badge>
      </div>
      <div className='flex items-center mt-3 gap-2'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant='ghost' className='rounded-full font-medium bg-gray-100 '>Details</Button>
        <Button className='bg-purple-500 rounded-xl hover:bg-black text-white'>Save For Later</Button>

      </div>

    </div>
  )
}

export default Job

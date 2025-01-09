import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
      <div>
        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>

      <div>
        <h1 className='text-lg font-bold my-1' >{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className='flex flex-row gap-3 my-2 items-center'>
        <Badge className={'text-blue-500 font-bold '} variant={'ghost'}>{job?.position}</Badge>
        <Badge className={'text-red-600 font-bold '} variant={'ghost'}>{job?.jobType}</Badge>
        <Badge className={'text-purple-500 font-bold '} variant={'ghost'}>{job?.salary}</Badge>
      </div>

    </div>
  )
}

export default LatestJobCards

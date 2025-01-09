import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button.jsx'
import { Pen, Mail, Contact, } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable.jsx'
import UpdateProfileDialog from './updateProfileDialog.jsx'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const isResume = true;


const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex  justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Avatar>
              <AvatarImage src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg' className='h-24 w-24' alt='profile' />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
            <div>

            </div>

          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className='text-right'><Pen /></Button>
        </div>
        <div className='flex flex-col gap-2 mx-7'>
          <div className='flex items-center gap-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>

        </div>

        <div className='mt-3'>
          <h1 className='font-bold text-lg mx-7 '>Skills</h1>
          <div className='flex items-center gap-1 mx-4'>
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className='text-lg text-gray-500'>{item}</Badge>) : <span>NA</span>

            }

          </div>
        </div>

        <div className='w-full grid max-w-sm items-center gap-1 mx-7'>
          <label className='text-md font-bold'>Resume</label>
          {
            isResume ? <a href={user?.profile?.resume} className='text-blue-600 w-full hover:underline cursor-pointer' target='blank' >{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
          }

        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />

    </div >
  )
}

export default Profile

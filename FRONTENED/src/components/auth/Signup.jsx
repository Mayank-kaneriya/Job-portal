import React, { useState } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input.jsx'
import { RadioGroup, } from '../ui/radio-group.jsx'
import { Button } from '../ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'




function Signup() {
  const { user } = useSelector(store => store.auth)
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""

  })

  const navigate = useNavigate();
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);

    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);

      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }
    finally {
      dispatch(setLoading(false));
    }

    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user])

  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='text-xl font-bold mb-5'>Sign up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="patel"
            />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="xxxxxxxxxx"
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder=""
            />
          </div>
          <div >
            <RadioGroup defaultValue="Student" className='flex  items-center my-3 justify-between'>
              <div className='flex items-center gap-2'>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    value="student"
                    className='cursor-pointer' />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    value="recruiter"
                    className='cursor-pointer' />

                  <Label htmlFor="r2">Recruiter</Label>
                </div>

              </div>

              <div className='flex items-center gap-2 '>
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className='cursor-pointer'
                />

              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className='w-full my-2 ' > <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
              <Button type="submit" className='text-white bg-black hover:bg-black cursor-pointer my-2 w-full'>Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600 font-bold'>Login</Link></span>

        </form>
      </div>
    </div>
  )
}

export default Signup

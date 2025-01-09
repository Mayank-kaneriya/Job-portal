import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar.jsx';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input.jsx';
import { RadioGroup } from '../ui/radio-group.jsx';
import { Button } from '../ui/button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice.js';
import { Loader2 } from 'lucide-react';
import store from '@/redux/store.js';

function Login() {
  const { user } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      // Log input for debugging
      console.log('Submitting login with input:', input);

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      // Log the response for debugging
      console.log('Login Response:', res);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/'); // Redirect to home page after successful login
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message); // Handle any error from the backend
      }
    } catch (error) {
      // Log error for debugging
      console.error('Login Error:', error);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="text-xl font-bold mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder=""
            />
          </div>

          <div>
            <RadioGroup defaultValue="Student" className="flex items-center my-3 justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    value="student"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    value="recruiter"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="text-white bg-black hover:bg-black cursor-pointer my-2 w-full">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{' '}
            <Link to="/Signup" className="text-blue-600 font-bold">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

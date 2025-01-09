// src/components/admin/Companies.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
// Correct import for default export
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input));

  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <input
            className="w-fit border-2 border-gray-400 p-1"
            placeholder="Filter by name,role"
            onChange={(e) => { setInput(e.target.value) }}
          />
          <Button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-black text-white hover:bg-black"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />  {/* This should now work correctly */}
      </div>
    </div>
  );
};

export default AdminJobs;

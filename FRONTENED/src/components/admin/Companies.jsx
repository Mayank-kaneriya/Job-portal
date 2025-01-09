// src/components/admin/Companies.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';  // Correct import for default export
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));

  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <input
            className="w-fit border-2 border-gray-400 p-1"
            placeholder="Filter by name"
            onChange={(e) => { setInput(e.target.value) }}
          />
          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-black text-white hover:bg-black"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />  {/* This should now work correctly */}
      </div>
    </div>
  );
};

export default Companies;

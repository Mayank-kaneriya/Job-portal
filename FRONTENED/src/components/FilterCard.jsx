import { setsearchedQuery } from '@/redux/jobSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Mumbai", "Pune", "Hydrebad"],
  },
  {
    filterType: "Industry",
    array: ["Frontened Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "40k-1LPA", "1LPA-5LPA"],
  }
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');  // To store the selected value

  const changeHandler = (e) => {
    setSelectedValue(e.target.value);  // Update the selected value on change
  };

  useEffect(() => {
    dispatch(setsearchedQuery(selectedValue))
    // console.log(selectedValue);   Log the selected value whenever it changes
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold'>Filter Jobs</h1>
      <hr className='mt-3' />
      <div>
        {
          filterData.map((data, index) => (
            <div key={data.filterType}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id-${index}-${idx}`;  // Create a unique itemId for each radio button
                  return (
                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                      <input
                        type="radio"
                        id={itemId}
                        name={data.filterType}
                        value={item}
                        checked={selectedValue === item}  // Check if this radio button is selected
                        onChange={changeHandler}  // Handle change
                      />
                      <label htmlFor={itemId}>{item}</label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FilterCard;

import React, { useState, useRef } from 'react';
import { Button } from 'components/ui';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import OutsideClickHandler from 'react-outside-click-handler';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSortBy } from '../store/stateSlice';
import {  getTasks, setSort } from '../store/dataSlice';

const TaskSortBy = () => {
  const dispatch = useDispatch();
  const dropdownSortBy = useSelector((state) => state.taskList.state.dropdownSortBy);
  const sort = useSelector((state) => state.taskList.data.filterData.sort);
  const filterData = useSelector((state) => state.taskList.data.filterData);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sortDirections, setSortDirections] = useState({});

  const buttonRef = useRef(null);


  const handleSortToggle = () => {
    dispatch(toggleSortBy(!dropdownSortBy));
  };

  const closeDropdown = () => {
    dispatch(toggleSortBy(false));
  };

  const options = [
    { value: 'createdAt', label: 'Created At' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'status', label: 'Status' }
  ];

  const handleSelectChange = (selected) => {
  
    setSelectedOptions(selected);
    const newSortDirections = selected.reduce((acc, option) => {
      acc[option.value] = acc[option.value] || 'asc';
      return acc;
    }, {});
    setSortDirections(newSortDirections);
  };
  const toggleSortDirection = (field) => {
    setSortDirections({
      ...sortDirections,
      [field]: sortDirections[field] === 'asc' ? 'desc' : 'asc'
    });
  };
  const applySort = () => {
    dispatch(setSort({...sortDirections}));
    dispatch(getTasks({ ...filterData,sort:{...sortDirections}}));
    
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left w-full">
      <Button type="button" ref={buttonRef} icon={<HiSortAscending />} onClick={handleSortToggle} block>Sort By</Button>

      {dropdownSortBy && (
        <OutsideClickHandler onOutsideClick={closeDropdown}>
          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1 px-4">
              <Select
                isMulti
                options={options}
                onChange={handleSelectChange}
                className="mb-3"
              />
              {selectedOptions.map((option) => (
                <div key={option.value} className="flex items-center justify-between my-1">
                  <span>{option.label}</span>
                  <button onClick={() => toggleSortDirection(option.value)}>
                    {sortDirections[option.value] === 'asc' ? <HiSortAscending /> : <HiSortDescending />}
                  </button>
                </div>
              ))}
              <Button onClick={applySort}>Apply</Button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default TaskSortBy;

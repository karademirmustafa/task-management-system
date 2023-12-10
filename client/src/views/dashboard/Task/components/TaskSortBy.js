import React, { useState, useRef } from 'react';
import { Button } from 'components/ui';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import OutsideClickHandler from 'react-outside-click-handler';
import Select from 'react-select';

const TaskSortBy = ({ handleSort }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sortDirections, setSortDirections] = useState({});

  const buttonRef = useRef(null);

  const handleSortToggle = () => {
    setIsSortOpen(!isSortOpen);
  };

  const closeDropdown = () => {
    setIsSortOpen(false);
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
console.log(sortDirections,"SORT DİRECTİONS")
  const toggleSortDirection = (field) => {
    setSortDirections({
      ...sortDirections,
      [field]: sortDirections[field] === 'asc' ? 'desc' : 'asc'
    });
  };

  const applySort = () => {
    handleSort(selectedOptions.map(option => ({
      field: option.value,
      direction: sortDirections[option.value]
    })));
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left w-full">
      <Button type="button" ref={buttonRef} icon={<HiSortAscending />} onClick={handleSortToggle} block>Sort By</Button>

      {isSortOpen && (
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
              <Button onClick={applySort}>Apply Sort</Button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default TaskSortBy;

import React, { useRef, useState } from 'react';
import { Button } from 'components/ui';
import {
  HiFilter,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineX,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi';
import OutsideClickHandler from 'react-outside-click-handler';

const TaskStatusFilter = ({ handleFilter, currentFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(currentFilter || {});
  const buttonRef = useRef(null);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeDropdown = () => {
    setIsFilterOpen(false);
  };

  const filterOptions = [
    { key: 'pending', label: 'Pending', icon: <HiOutlineClock /> },
    { key: 'completed', label: 'Completed', icon: <HiOutlineCheck /> },
    { key: 'waiting', label: 'Waiting', icon: <HiOutlineX /> }
  ];

  const onFilterOptionClick = (filterKey) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterKey]: !selectedFilters[filterKey]
    });
  };
  const applyFilters = () => {
    handleFilter(selectedFilters);
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left w-full">
      <OutsideClickHandler onOutsideClick={closeDropdown}>
        <Button
          ref={buttonRef}
          icon={isFilterOpen ? <HiChevronUp /> : <HiChevronDown />}
          block
          onClick={handleFilterToggle}>
          Status
        </Button>

        {isFilterOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              {filterOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={!!selectedFilters[option.key]}
                    onChange={() => onFilterOptionClick(option.key)}
                    className="mr-2"
                  />
                  {option.icon}
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
              <div className="px-4 py-2 text-sm">
                <Button onClick={applyFilters}>Apply</Button>
              </div>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default TaskStatusFilter;

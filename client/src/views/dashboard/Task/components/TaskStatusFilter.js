import React, { useRef, useState } from 'react';
import { Button } from 'components/ui';
import {
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineX,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { toggleStatusFilter } from '../store/stateSlice';
import { getTasks, setFilter } from '../store/dataSlice';

const TaskStatusFilter = () => {

  const dispatch = useDispatch();
  const dropdownStatusFilter = useSelector(state => state.taskList.state.dropdownStatusFilter);
  const filter = useSelector((state) => state.taskList.data.filterData.filter);
  const filterData = useSelector((state) => state.taskList.data.filterData);
  const [selectedFilters, setSelectedFilters] = useState({});
  const buttonRef = useRef(null);

  const handleFilterToggle = () => {
    dispatch(toggleStatusFilter(!dropdownStatusFilter));
  };

  const closeDropdown = () => {
    dispatch(toggleStatusFilter(false));
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
    dispatch(setFilter({...selectedFilters}))
    dispatch(getTasks({ ...filterData ,filter:{status:{...selectedFilters}}}));
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left w-full">
      <OutsideClickHandler onOutsideClick={closeDropdown}>
        <Button
          type="button"
          ref={buttonRef}
          icon={dropdownStatusFilter ? <HiChevronUp /> : <HiChevronDown />}
          block
          onClick={handleFilterToggle}>
          Status
        </Button>

        {dropdownStatusFilter && (
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

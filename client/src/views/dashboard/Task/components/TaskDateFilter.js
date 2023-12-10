import React, { useRef, useState } from 'react';
import { Button } from 'components/ui';
import { HiCalendar } from 'react-icons/hi';
import OutsideClickHandler from 'react-outside-click-handler';
import toast from 'react-hot-toast';

const TaskDateFilter = ({ handleDateFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dueDateRange, setDueDateRange] = useState({ start: '', end: '' });
  const [createdAtRange, setCreatedAtRange] = useState({ start: '', end: '' });

  const buttonRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const applyFilter = () => {
    let filters = {};

    if (dueDateRange.start && dueDateRange.end) {
      filters.dueDate = dueDateRange;
    }

    if (createdAtRange.start && createdAtRange.end) {
      filters.createdAt = createdAtRange;
    }
    if (Object.keys(filters).length > 0) {
      handleDateFilter(filters);
      closeDropdown();
    } else {
      toast.error("Please select start and end date ")
    }
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left w-full">
      <OutsideClickHandler onOutsideClick={closeDropdown}>
        <Button ref={buttonRef} icon={<HiCalendar />} block onClick={toggleDropdown}>
          Date Range
        </Button>

        {isDropdownOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-2 px-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date Range</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={dueDateRange.start}
                  onChange={(e) => setDueDateRange({ ...dueDateRange, start: e.target.value })}
                />
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={dueDateRange.end}
                  onChange={(e) => setDueDateRange({ ...dueDateRange, end: e.target.value })}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Created At Range</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={createdAtRange.start}
                  onChange={(e) => setCreatedAtRange({ ...createdAtRange, start: e.target.value })}
                />
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={createdAtRange.end}
                  onChange={(e) => setCreatedAtRange({ ...createdAtRange, end: e.target.value })}
                />
              </div>
              <div className="mt-4">
                <Button onClick={applyFilter}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default TaskDateFilter;

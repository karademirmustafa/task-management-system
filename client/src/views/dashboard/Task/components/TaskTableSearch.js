import React, { useRef } from 'react';
import { Input } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, setTableData } from '../store/dataSlice';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';

const TaskTableSearch = () => {
  const dispatch = useDispatch();

  const searchInput = useRef();

  const tableData = useSelector((state) => state.taskList.data.tableData);

  const debounceFn = debounce(handleDebounceFn, 501);

  function handleDebounceFn(val) {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === 'string' && val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === 'string' && val.length === 0) {
      fetchData(newTableData);
    }
  }

  const fetchData = (data) => {
    console.log(data,"DATA")
    // dispatch(setTableData(data));
    // dispatch(getTasks(data));
  };

  const onEdit = (e) => {
    debounceFn(e.target.value);
  };

  return (
    <Input
      ref={searchInput}
      className="max-w-md md:w-52"
      size="sm"
      placeholder="Search"
      onChange={onEdit}
    />
  );
};

export default TaskTableSearch;
